import express from "express";
import { supabase } from "../config/supabase.js";
import {
  saveProgress,
  getUserProgress,
  getCourseProgress,
} from "../controllers/progressController.js";
const router = express.Router();

router.post("/update", saveProgress);
router.get("/user/:userId", getUserProgress);

router.get("/:courseId/:userId", getCourseProgress);
export default router;