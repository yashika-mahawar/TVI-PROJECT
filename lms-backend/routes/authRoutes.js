import express from "express";
const router = express.Router();

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfileImage,
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../controllers/authController.js";
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
router.put("/update-profile/:id",updateProfileImage);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
// Admin dashboard only
router.get(
  "/admin/dashboard",
  authMiddleware,
  roleMiddleware(["admin"]),
  (req, res) => {
    res.json({
      message: "Welcome Admin Dashboard",
    });
  }
);

// Student route only
router.get(
  "/student/dashboard",
  authMiddleware,
  roleMiddleware(["student"]),
  (req, res) => {
    res.json({
      message: "Welcome Student Dashboard",
    });
  }
);

export default router;