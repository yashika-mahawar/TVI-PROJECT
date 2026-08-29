import express from "express";
const router = express.Router();

// Controller import karo (.js extension zaroori hai)
import { createOrder, verifyPayment } from "../controllers/paymentController.js";

// Order create karne ka route
router.post("/create-order", createOrder);

// Payment verify karne ka route
router.post("/verify-payment", verifyPayment);

export default router;