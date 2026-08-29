import React from "react";
import { useNavigate } from "react-router-dom";
import { FaChartPie, FaGraduationCap } from "react-icons/fa";
import WelcomeCard from "./WelcomeCard/WelcomeCard";
import StatsCards from "./StatsCards/StatsCards";
import CompletionChart from "./CompletionChart/CompletionChart";
import CourseProgressCard from "./CourseProgressCard/CourseProgressCard";
import Activity from "./Activity/Activity";
import Notifications from "./Notifications/Notifications";
import useStudentProgress from "../../hooks/useStudentProgress";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { courses, enrolledCourses, completedCourses, inProgress, overallProgress } =
    useStudentProgress();

  return (
    <div className="dashboard-page">
      <section className="dashboard-section">
        <WelcomeCard isAdmin={false} />
      </section>

      <section className="dashboard-section">
        <StatsCards />
      </section>

      <section className="dashboard-section">
        <div className="section-header-flex">
          <h2 className="section-title">
            <span className="section-title-icon"><FaChartPie /></span>
            Completion Overview
          </h2>
        </div>
        <CompletionChart
          enrolledCourses={enrolledCourses}
          completedCourses={completedCourses}
          inProgress={inProgress}
          overallProgress={overallProgress}
        />
      </section>

      <section className="dashboard-section">
        <div className="section-header-flex">
          <h2 className="section-title">
            <span className="section-title-icon"><FaGraduationCap /></span>
            My Learning
          </h2>
          <button className="view-all-btn" onClick={() => navigate("/my-courses")}>
            View All →
          </button>
        </div>

        <div className="courses-grid-layout">
          {courses.map((course) => (
            <CourseProgressCard key={course.courseId} course={course} />
          ))}
        </div>
      </section>

      <div className="dashboard-split-grid">
        <div className="grid-column-stack">
          <div className="dashboard-panel">
            <Activity />
          </div>
        </div>

        <div className="grid-column-stack">
          <div className="dashboard-panel">
            <Notifications />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
