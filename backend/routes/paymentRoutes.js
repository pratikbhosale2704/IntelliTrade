// backend/routes/paymentRoutes.js
import express from "express";
import { processPayment } from "../controllers/paymentController.js";

const router = express.Router();

// POST /payment -> process a payment
router.post("/", processPayment);

export default router;
