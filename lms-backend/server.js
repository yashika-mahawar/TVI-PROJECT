import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import Routes using .js extension (zaroori hai ES modules mein)
import courseRoutes from "./routes/courseRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import liveClassRoutes from "./routes/liveClassRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";


dotenv.config();

const app = express();

// CORS configuration
// Vite dev server auto-picks the next free port (5173, 5174, 5175, ...) when
// one's busy, so a hardcoded single localhost port kept breaking local dev —
// allow any localhost port instead of just 5173.
const ALLOWED_ORIGINS = [
  "https://lms-frontend-xmbw.onrender.com", // <--- Yeh tumhare frontend ka live Render URL hai
];
const LOCALHOST_ORIGIN = /^http:\/\/localhost:\d+$/;

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin) || LOCALHOST_ORIGIN.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({
  extended: true,
  limit: "10mb",
}));
app.use((req, res, next) => {
  console.log(`REQ RECEIVED: ${req.method} ${req.url}`);
  next();
});
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/live-classes",liveClassRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/faculty", facultyRoutes);
// Testing endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working fine 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});