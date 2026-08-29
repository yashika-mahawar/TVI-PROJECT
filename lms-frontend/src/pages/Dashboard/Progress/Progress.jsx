import React from 'react';
import { FaBookOpen, FaCheckCircle, FaHourglassHalf, FaChartLine } from "react-icons/fa";
import useStudentProgress from "../../../hooks/useStudentProgress";
import './Progress.css';

const Progress = () => {
  const { courses, enrolledCourses, completedCourses, inProgress, overallProgress, loading } =
    useStudentProgress();

  if (loading) {
    return <h2 className="progress-loading">Loading...</h2>;
  }

  const stats = [
    {
      id: 1,
      label: "Enrolled Courses",
      value: enrolledCourses,
      subtext: "Total Enrolled",
      color: "var(--color-primary)",
      bg: "#eef2ff",
      icon: <FaBookOpen />,
    },
    {
      id: 2,
      label: "Completed Courses",
      value: completedCourses,
      subtext: "Finished",
      color: "var(--color-success-dark)",
      bg: "#ecfdf5",
      icon: <FaCheckCircle />,
    },
    {
      id: 3,
      label: "In Progress",
      value: inProgress,
      subtext: "Ongoing",
      color: "var(--color-warning)",
      bg: "#fffbeb",
      icon: <FaHourglassHalf />,
    },
    {
      id: 4,
      label: "Overall Progress",
      value: `${overallProgress}%`,
      subtext: "Across All Courses",
      color: "var(--color-primary-cyan)",
      bg: "#ecfeff",
      icon: <FaChartLine />,
    },
  ];

  return (
    <div>
      <div className="progress-header">
        <h1>Performance Analytics</h1>
        <p>Track your academic metrics, credits, and attendance scores.</p>
      </div>

      <div className="progress-grid">
        <div className="progress-courses-card">
          <h2>Course Progress</h2>

          {courses.map((course) => (
            <div key={course.courseId} className="progress-course-item">
              <div className="progress-course-item__row">
                <strong>{course.title}</strong>
                <span>{course.progress}%</span>
              </div>

              <div className="progress-bar-track">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${course.progress}%` }}
                />
              </div>

              <p className="progress-course-item__subtext">
                {course.completedVideos} / {course.totalVideos} Videos Completed
              </p>
            </div>
          ))}
        </div>

        {stats.map((stat) => (
          <div key={stat.id} className="progress-stat-card">
            <div className="progress-stat-card__icon" style={{ color: stat.color, background: stat.bg }}>
              {stat.icon}
            </div>
            <p className="progress-stat-card__label">{stat.label}</p>
            <h2 className="progress-stat-card__value" style={{ color: stat.color }}>
              {stat.value}
            </h2>
            <p className="progress-stat-card__subtext">{stat.subtext}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;
