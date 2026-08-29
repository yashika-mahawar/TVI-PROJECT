import express from "express";
import {
  getLiveClasses,
  addLiveClass,
  updateLiveClass,
  deleteLiveClass
} from "../controllers/liveClassController.js";

const router = express.Router();

router.get("/", getLiveClasses);
router.post("/", addLiveClass);
router.put("/:id", updateLiveClass);

router.delete("/:id", deleteLiveClass);
export default router;