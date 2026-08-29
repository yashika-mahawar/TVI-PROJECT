import express from "express";
import {
  getDashboardStats,
  getStudents,
  deleteStudent,
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  getRecentEnrollments,
  getRecentStudents,
  getNotifications,
} from "../controllers/adminController.js";
const router = express.Router();

router.get("/dashboard", getDashboardStats);
router.get("/students", getStudents);

router.delete("/students/:id", deleteStudent);
router.get("/courses", getCourses);

router.post("/courses", addCourse);

router.put("/courses/:id", updateCourse);

router.delete("/courses/:id", deleteCourse);
router.get("/recent-enrollments", getRecentEnrollments);
router.get("/recent-students", getRecentStudents);
router.get("/notifications", getNotifications);
export default router;