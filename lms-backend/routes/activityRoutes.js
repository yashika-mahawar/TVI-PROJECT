import express from "express";
import { getUserActivities } from "../controllers/activityController.js";

const router = express.Router();

router.get("/:userId", getUserActivities);

export default router;