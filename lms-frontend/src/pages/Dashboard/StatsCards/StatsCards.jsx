import React from "react";
import { FaBookOpen, FaCheckCircle, FaHourglassHalf, FaChartLine } from "react-icons/fa";
import "./StatsCards.css";
import useStudentProgress from "../../../hooks/useStudentProgress";

const StatsCards = () => {
  const { enrolledCourses, completedCourses, inProgress, overallProgress, loading } =
    useStudentProgress();

  const statsData = loading
    ? []
    : [
        {
          label: "Enrolled Courses",
          value: enrolledCourses,
          icon: <FaBookOpen />,
          bgColor: "#eff6ff",
          color: "#1d4ed8",
        },
        {
          label: "Completed",
          value: completedCourses,
          icon: <FaCheckCircle />,
          bgColor: "#ecfdf5",
          color: "#047857",
        },
        {
          label: "In Progress",
          value: inProgress,
          icon: <FaHourglassHalf />,
          bgColor: "#fffbeb",
          color: "#b45309",
        },
        {
          label: "Overall Progress",
          value: `${overallProgress}%`,
          icon: <FaChartLine />,
          bgColor: "#ecfeff",
          color: "#0e7490",
        },
      ];

  return (
    <div className="stats-grid-container">
      {statsData.map((stat, index) => (
        <div key={index} className="stat-single-card">
          <div className="stat-icon-wrapper" style={{ backgroundColor: stat.bgColor, color: stat.color }}>
            {stat.icon}
          </div>
          <div className="stat-details">
            <h3 className="stat-value" style={{ color: "var(--color-text)" }}>
              {stat.value}
            </h3>
            <p className="stat-label">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
