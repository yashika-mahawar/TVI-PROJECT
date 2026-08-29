import express from "express";
import { getStudentNotifications } from "../controllers/notificationController.js";

const router = express.Router();

router.get("/:userId", getStudentNotifications);

export default router;