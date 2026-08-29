import { Routes, Route } from "react-router-dom";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Profile from "../pages/Profile/Profile";
import MyCourses from "../pages/MyCourses/MyCourses";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";
import CourseDetails from "../pages/CourseDetails/CourseDetails";
import Payment from "../pages/Payment/Payment";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import PaymentFailure from "../pages/PaymentFailure/PaymentFailure";
import Learning from "../pages/Learning/Learning";
import LiveClass from "../pages/LiveClass/LiveClass"; 
import Assignments from '../pages/Dashboard/Assignments/Assignments';
import Progress from '../pages/Dashboard/Progress/Progress';
import Admission from "../pages/Admissions/Admissions";
import Certification from "../pages/Certification/Certification";
import Pricing from "../pages/Pricing/Pricing";
import AdminProtectedRoute from "../components/ProtectedRoute/AdminProtectedRoute";
import StudentLayout from "../Layout/StudentLayout";
import AdminLayout from "../Layout/AdminLayout";
// 🔥 AUTH PAGES IMPORT
import ForgotPassword from "../pages/Auth/ForgotPassword";
import VerifyOTP from "../pages/Auth/VerifyOTP";
import ResetPassword from "../pages/Auth/ResetPassword";

// 🔥 ADMIN PAGES IMPORT
import AdminLogin from "../pages/Admin/AdminLogin";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import ManageCourses from "../pages/Admin/ManageCourses";
import ManageVideos from "../pages/Admin/ManageVideos";
import ManageStudents from "../pages/Admin/ManageStudents";
import AdminLiveClasses from "../pages/Admin/AdminLiveClasses";
import AdminAssignments from "../pages/Admin/AdminAssignments";
import ManageFaculty from "../pages/Admin/ManageFaculty";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/enroll" element={<Admission />} />
      <Route path="/admissions" element={<Admission />} />
      <Route path="/certification" element={<Certification />} />
      <Route path="/pricing" element={<Pricing />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route element={<StudentLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/live-classes" element={<LiveClass />} />
      </Route>

      <Route path="/course/:id" element={<CourseDetails />} />
      <Route path="/learning/:id" element={<Learning />} />
      <Route path="/course-details" element={<CourseDetails />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/payment-failure" element={<PaymentFailure />} />
      
      {/* 🔥 ADMIN ROUTES */}
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/manage-courses" element={<ManageCourses />} />
        <Route path="/admin/videos" element={<ManageVideos />} />
        <Route path="/admin/students" element={<ManageStudents />} />
        <Route path="/admin/live-classes" element={<AdminLiveClasses />} />
        <Route path="/admin/assignments" element={<AdminAssignments />} />
        <Route path="/admin/faculty" element={<ManageFaculty />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;