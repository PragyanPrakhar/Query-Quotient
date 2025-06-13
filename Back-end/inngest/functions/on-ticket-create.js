import { inngest } from "../client.js";
import Ticket from "../../models/ticket.model.js";
import User from "../../models/user.model.js";
import { NonRetriableError } from "inngest";
import { sendMail } from "../../utils/mailer.js";
import { generateTicketAssignedHtml } from "../../email-templates/ticket-assigned.js";
import analyzeTicket from "../../utils/ai-agent.js";
import { format } from "date-fns";

export const onTicketCreated = inngest.createFunction(
    { id: "on-ticket-created", retries: 2 },
    { event: "ticket/created" },
    async ({ event, step }) => {
        try {
            const { ticketId } = event.data;

            if (!ticketId) {
                throw new NonRetriableError("Missing ticketId in event data.");
            }

            const ticket = await step.run("fetch-ticket", async () => {
                const ticketObject = await Ticket.findById(ticketId);
                if (!ticketObject) {
                    throw new NonRetriableError(
                        "Ticket no longer exists in our database"
                    );
                }
                return ticketObject;
            });

            console.log("Ticket found:", ticket._id);

            await step.run("update-ticket-status", async () => {
                await Ticket.findByIdAndUpdate(ticket._id, {
                    status: "open",
                });
            });

            console.log("Ticket status updated to open");

            // AI analysis outside of step.run
            const aiResponse = await analyzeTicket(ticket); // OUTSIDE any step.run()

            await step.run("save-ai-results", async () => {
                if (aiResponse.error) {
                    console.error("AI analysis failed:", aiResponse.message);
                    // Don't throw NonRetriableError here - instead return a default analysis
                    return {
                        relatedSkills: ["General Support"],
                        helpfulNotes:
                            "AI analysis failed. Please review the ticket manually.",
                        priority: "medium",
                        success: false,
                        error: aiResponse.message,
                    };
                }
                return { success: true };
            });

            console.log("AI analysis successful:", aiResponse);
            console.log("Id of the tickt is:-> ", ticket._id);

            // Update ticket with AI analysis results
            await Ticket.findByIdAndUpdate(ticket._id, {
                relatedSkills: aiResponse.relatedSkills || ["General Support"],
                helpfulNotes:
                    aiResponse.helpfulNotes || "No helpful notes provided",
                priority: ["low", "medium", "high"].includes(
                    aiResponse.priority
                )
                    ? aiResponse.priority
                    : "medium",
                status: "in-progress",
            });

            const aiAnalysis = {
                relatedSkills: aiResponse.relatedSkills || ["General Support"],
                success: !aiResponse.error,
            };
            console.log("AI analysis results:", aiAnalysis);
            // Continue with moderator assignment even if AI analysis had issues
            const moderator = await step.run("assign-moderator", async () => {
                const skills = aiAnalysis.relatedSkills || ["General Support"];

                let user = await User.findOne({
                    role: "moderator",
                    skills: {
                        $elemMatch: {
                            $regex: skills.join("|"),
                            $options: "i",
                        },
                    },
                });

                if (!user) {
                    console.log(
                        "No matching moderator found, looking for admin"
                    );
                    user = await User.findOne({ role: "admin" });
                }

                if (user) {
                    console.log(
                        `Assigning ticket to ${user.role} ${user.username}`
                    );
                    await Ticket.findByIdAndUpdate(ticket._id, {
                        assignedTo: user._id,
                    });
                } else {
                    console.log("No suitable user found for assignment");
                }

                return user;
            });

            console.log("User assigned done successfully.");

            await step.run("send-email-notification", async () => {
                if (moderator) {
                    const finalTicket = await Ticket.findById(ticket._id);
                    await sendMail(
                        moderator.email,
                        "Ticket Assigned",
                        `A new ticket has been assigned to you: ${finalTicket.title}`,
                        generateTicketAssignedHtml({
                            moderatorName: moderator.username,
                            ticketTitle: finalTicket.title,
                            ticketDescription: finalTicket.description,
                            ticketDate: format(
                                ticket.createdAt,
                                "dd MMM yyyy, hh:mm a"
                            ),
                        })
                    );
                    console.log(
                        `Email notification sent to ${moderator.email}`
                    );
                }
            });
            return {
                success: true,
                ticketId: ticket._id,
                moderatorAssigned: moderator ? moderator._id : null,
                aiAnalysisSuccess: aiAnalysis.success,
            };
        } catch (error) {
            console.error(
                "❌ Error in ticket processing workflow:",
                error.message
            );
            return {
                success: false,
                error: error.message,
            };
        }
    }
);
