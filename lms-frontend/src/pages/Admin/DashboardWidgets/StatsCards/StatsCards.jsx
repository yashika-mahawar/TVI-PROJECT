import React from "react";
import { FaUserGraduate, FaBook, FaVideo, FaChartLine } from "react-icons/fa";
import "./StatsCards.css";

const StatsCards = ({ students, courses, videos, enrollments }) => {
  const statsData = [
    {
      label: "Total Students",
      value: students,
      icon: <FaUserGraduate />,
      bgColor: "#eff6ff",
      color: "#1d4ed8",
    },
    {
      label: "Total Courses",
      value: courses,
      icon: <FaBook />,
      bgColor: "#ecfdf5",
      color: "#047857",
    },
    {
      label: "Total Videos",
      value: videos,
      icon: <FaVideo />,
      bgColor: "#fffbeb",
      color: "#b45309",
    },
    {
      label: "Total Enrollments",
      value: enrollments,
      icon: <FaChartLine />,
      bgColor: "#fef2f2",
      color: "#b91c1c",
    },
  ];

  return (
    <div className="admin-stats-grid">
      {statsData.map((stat) => (
        <div key={stat.label} className="admin-stat-card">
          <div
            className="admin-stat-icon-wrapper"
            style={{ backgroundColor: stat.bgColor, color: stat.color }}
          >
            {stat.icon}
          </div>
          <div className="admin-stat-details">
            <h3 className="admin-stat-value">{stat.value}</h3>
            <p className="admin-stat-label">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
