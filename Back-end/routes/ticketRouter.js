import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import { createTicket, getTickets,getTicket,closeTicket } from '../controllers/ticket.js';
const router=express.Router();
router.get("/",authenticate, getTickets);
router.get("/:id", authenticate, getTicket);
router.post("/", authenticate, createTicket);
router.post("/close-ticket/:id", authenticate,closeTicket);
export default router;