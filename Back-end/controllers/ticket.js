import { inngest } from "../inngest/client.js";
import Ticket from "../models/ticket.model.js";

export const createTicket = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                error: "Title and description are required",
            });
        }
        const now = new Date();
        const deadline = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days in ms
        const ticket = new Ticket({
            title,
            description,
            createdBy: req.user._id.toString(),
            deadline,
        });
        await ticket.save();
        await inngest.send({
            name: "ticket/created",
            data: {
                ticketId: (await ticket)._id.toString(),
                title,
                description,
                createdBy: req.user._id.toString(),
                
            },
        });

        console.log("📨 Event sent: ticket/created");

        return res.status(201).json({
            message: "Ticket created successfully",
            ticket: ticket,
        });
    } catch (error) {
        console.error("Error creating ticket:", error);
        return res.status(500).json({
            error: "Error creating ticket",
            message: error.message,
        });
    }
};

export const getTickets = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }
        let tickets = [];
        if (user.role !== "user") {
            tickets = await Ticket.find({})
                .populate("assignedTo", ["email", "_id"])
                .sort({ createdAt: -1 });
        } else {
            tickets = await Ticket.find({ createdBy: user._id })
                .select("title description status createdAt priority deadline")
                .sort({ createdAt: -1 });
        }
        return res.status(200).json({
            message: "Tickets fetched successfully",
            tickets: tickets,
        });
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return res.status(500).json({
            error: "Error fetching tickets",
            message: error.message,
        });
    }
};

export const getTicket = async (req, res) => {
    try {
        const user = req.user;
        console.log("User fetching ticket:", user);
        if (!user) {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }
        let ticket;
        if (user.role !== "user") {
            ticket = await Ticket.findById(req.params.id)
                .populate("assignedTo", ["email", "_id"])
                .populate("createdBy", "username");
        } else {
            ticket = await Ticket.findOne({
                createdBy: user._id,
                _id: req.params.id,
            })
                .select("title description status createdAt priority createdBy deadline")
                .populate("createdBy", "username");
        }
        if (!ticket) {      
            return res.status(404).json({
                error: "Ticket not found",
            });
        }
        console.log("Fetched ticket:", ticket);
        return res.status(200).json({
            message: "Ticket fetched successfully",
            ticket: ticket,
        });
    } catch (error) {
        console.error("Error fetching ticket:", error);
        return res.status(500).json({
            error: "Error fetching single ticket",
            message: error.message,
        });
    }
};

export const closeTicket = async (req, res) => {
    try {
        const user = req.user;
        console.log("User closing ticket:", user);
        if (!user) {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }
        const ticket = await Ticket.findById(req.params.id);
        console.log("ticket id which is to be closed", req.params.id);
        if (!ticket) {
            return res.status(404).json({
                error: "Ticket not found",
            });
        }
        /* if (ticket.createdBy.toString() !== user._id.toString()) {
            return res.status(403).json({
                error: "You are not authorized to close this ticket",
            });
        } */

        const isCreator = ticket.createdBy.toString() === user._id.toString();
        const isAssignee =
            ticket.assignedTo?.toString() === user._id.toString();
        const isAdmin = user.role === "admin";

        if (!isCreator && !isAssignee && !isAdmin) {
            return res.status(403).json({
                error: "You are not authorized to close this ticket",
            });
        }
        console.log("Ticket Creator:", ticket.createdBy.toString());
        console.log("Ticket Assignee:", ticket.assignedTo?.toString());
        console.log(
            "Requesting User:",
            user._id.toString(),
            "Role:",
            user.role
        );

        ticket.status = "closed";
        await ticket.save();
        await inngest.send({
            name: "ticket/closed",
            data: {
                ticketId: ticket._id.toString(),
                closedBy: user._id.toString(),
            },
        });

        console.log("📨 Event sent: ticket/closed");

        return res.status(200).json({
            message: "Ticket closed successfully",
            ticket: ticket,
        });
    } catch (error) {
        console.error("Error closing ticket:", error);
        return res.status(500).json({
            error: "Error closing ticket",
            message: error.message,
        });
    }
};

export const getExpiredTickets = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }

        let expiredTickets = [];
        const now = new Date();

        if (user.role !== "user") {
            // Admins/Moderators can see all expired tickets
            expiredTickets = await Ticket.find({ deadline: { $lt: now } })
                .populate("assignedTo", ["email", "_id"])
                .sort({ createdAt: -1 });
        } else {
            // Regular users can only see their own expired tickets
            expiredTickets = await Ticket.find({
                createdBy: user._id,
                deadline: { $lt: now },
            })
                .select("title description status createdAt priority deadline")
                .sort({ createdAt: -1 });
        }

        return res.status(200).json({
            message: "Expired tickets fetched successfully",
            tickets: expiredTickets,
        });
    } catch (error) {
        console.error("Error fetching expired tickets:", error);
        return res.status(500).json({
            error: "Error fetching expired tickets",
            message: error.message,
        });
    }
};