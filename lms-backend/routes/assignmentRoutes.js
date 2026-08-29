import express from "express";

import {
  getAssignments,
  addAssignment,
  updateAssignment,
  deleteAssignment,
} from "../controllers/assignmentController.js";

const router = express.Router();

router.get("/", getAssignments);

router.post("/", addAssignment);

router.put("/:id", updateAssignment);

router.delete("/:id", deleteAssignment);

export default router;