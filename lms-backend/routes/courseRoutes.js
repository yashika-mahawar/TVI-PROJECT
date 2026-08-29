import express from "express";
const router = express.Router();

// Middlewares import karo (.js extension zaroori hai)
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

// Controllers import karo
import { 
  getCourses, 
  getCourseById, 
  createCourse, 
  updateCourse 
} from "../controllers/courseController.js";

// Routes define karo
router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/", createCourse);
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updateCourse);

export default router;