import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import { createNotification } from "../utils/createNotification.js";
import { supabase } from "../config/supabase.js";
dotenv.config();

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
  console.error("❌ Razorpay keys missing in .env");
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// ================= CREATE ORDER =================

export const createOrder = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { amount } = req.body;
console.log("Received Amount:", amount);
console.log("Amount Type:", typeof amount);
    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });
    }

    const options = {
      amount: Number(amount), // Frontend should already send paisa
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    console.log("Creating Order:", options);

    const order = await razorpay.orders.create(options);

    console.log("Order Created:", order);

    return res.status(200).json(order);
  } catch (error) {
    console.error("Razorpay Order Creation Error:", error);

    return res.status(500).json({
      success: false,
      message: error.error?.description || error.message,
    });
  }
};

// ================= VERIFY PAYMENT =================

export const verifyPayment = async (req, res) => {
  try {
    const {
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  user_id,
  course_id,
} = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {

  // Course title nikaalo
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select("title")
    .eq("id", course_id)
    .single();
const { data: user } = await supabase
  .from("users")
  .select("full_name")
  .eq("id", user_id)
  .single();

await createNotification(
  "admin",
  `${user.full_name} completed payment for ${course.title}`
);
  if (courseError) {
    throw courseError;
  }

  // Activity insert karo
  await supabase.from("activities").insert([
    {
      user_id,
      title: "Payment Successful",
      description: `${course.title} purchased successfully`,
      type: "payment",
    },
  ]);

  return res.json({
    success: true,
    message: "Payment Verified",
  });
}

    return res.status(400).json({
      success: false,
      message: "Invalid Signature",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};