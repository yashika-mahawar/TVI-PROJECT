import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { FaChartPie } from "react-icons/fa";
import "./CompletionChart.css";

const CompletionChart = ({ enrolledCourses, completedCourses, inProgress, overallProgress }) => {
  if (!enrolledCourses) {
    return (
      <div className="completion-chart completion-chart--empty">
        <FaChartPie className="completion-chart__empty-icon" />
        <p>Enroll in a course to see your progress</p>
      </div>
    );
  }

  const notStarted = Math.max(enrolledCourses - completedCourses - inProgress, 0);

  const data = [
    { name: "Completed", value: completedCourses, color: "#22c55e" },
    { name: "In Progress", value: inProgress, color: "#f59e0b" },
    { name: "Not Started", value: notStarted, color: "#e2e8f0" },
  ].filter((segment) => segment.value > 0);

  return (
    <div className="completion-chart">
      <div className="completion-chart__donut">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={90}
              paddingAngle={2}
            >
              {data.map((segment) => (
                <Cell key={segment.name} fill={segment.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="completion-chart__center">
          <span className="completion-chart__percent">{overallProgress}%</span>
          <span className="completion-chart__caption">Overall</span>
        </div>
      </div>

      <ul className="completion-chart__legend">
        <li className="completion-chart__chip" style={{ background: "#ecfdf5", color: "#047857" }}>
          <span className="completion-chart__dot" style={{ background: "#22c55e" }} />
          Completed <strong>{completedCourses}</strong>
        </li>
        <li className="completion-chart__chip" style={{ background: "#fffbeb", color: "#b45309" }}>
          <span className="completion-chart__dot" style={{ background: "#f59e0b" }} />
          In Progress <strong>{inProgress}</strong>
        </li>
        <li className="completion-chart__chip" style={{ background: "#f8fafc", color: "#475569" }}>
          <span className="completion-chart__dot" style={{ background: "#94a3b8" }} />
          Not Started <strong>{notStarted}</strong>
        </li>
      </ul>
    </div>
  );
};

export default CompletionChart;
