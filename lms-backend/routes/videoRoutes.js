import express from "express";
const router = express.Router();
import {
  getAllVideos,
  getVideosByCourse,
  addVideo,
    deleteVideo,
      updateVideo,
} from "../controllers/videoController.js";
router.get("/", getAllVideos);

router.get("/:course_id", getVideosByCourse);

router.post("/", addVideo);
router.put("/:id", updateVideo);
router.delete("/:id", deleteVideo);




export default router;