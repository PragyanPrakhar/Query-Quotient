import { inngest } from "../clint.js";
import { NonRetriableError } from "inngest";
import Ticket from "../../models/ticket.model.js";
import { sendMail } from "../../utils/mailer.js";
import { generateTicketClosedHtml } from "../../email-templates/ticket-close.js";
export const onTicketClose = inngest.createFunction(
    { id: "onTicketClose", retries: 2 },
    { event: "ticket/close" },
    async ({ event, step }) => {
        try {
            const { ticketId } = event.data;
            const ticket = await step.run("get ticket by ID", async () => {
                const ticketObject = await Ticket.findById(ticketId).populate(
                    "createdBy",
                    ["email", "_id", "username"]
                );
                if (!ticketObject) {
                    throw new NonRetriableError("Ticket not found");
                }
                return ticketObject;
            });
            if (!ticket) {
                throw new NonRetriableError("Ticket not found");
            }
            if (ticket.status != "closed") {
                throw new NonRetriableError("Ticket is not closed yet");
            }

            await step.run("send email notification", async () => {
                const subject = `Ticket #${ticket._id} Closed`;
                const text = `👋Hello ${ticket.createdBy.email},\n\nYour ticket with ID ${ticket._id} has been successfully closed.\n\nThank you for using our service!`;
                await sendMail(ticket.createdBy.email, subject, text,generateTicketClosedHtml({
                    userName: ticket.createdBy.username,
                    ticketTitle: ticket.title,
                    ticketId: ticket._id.toString(),
                    closedAt: new Date(ticket.updatedAt).toLocaleString(),
                    
                }));
            });
            return { success: true };
        } catch (error) {
            console.error("❌Error in onTicketClose function:", error.message);
            return { success: false };
        }
    }
);
