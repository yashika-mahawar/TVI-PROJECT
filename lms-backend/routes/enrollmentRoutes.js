import express from "express";
const router = express.Router();

// Middlewares aur Controllers import karo (.js extension ke sath)
import authMiddleware from "../middleware/authMiddleware.js";
import { enrollCourse, getEnrolledCourses } from "../controllers/enrollmentController.js";

// Routes define karo
router.post("/enroll", authMiddleware, enrollCourse);
router.get("/my-courses", authMiddleware, getEnrolledCourses);
export default router;