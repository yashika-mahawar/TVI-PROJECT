import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { FaChartBar } from "react-icons/fa";
import "./AnalyticsChart.css";

const AnalyticsChart = ({ students, courses, videos, enrollments }) => {
  const chartData = [
    { name: "Students", value: students },
    { name: "Courses", value: courses },
    { name: "Videos", value: videos },
    { name: "Enrollments", value: enrollments },
  ];

  return (
    <div className="admin-analytics-chart">
      <h3 className="admin-panel-title">
        <span className="admin-panel-title-icon"><FaChartBar /></span>
        Platform Analytics
      </h3>

      <div className="admin-analytics-chart__canvas">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: "var(--color-text-muted)", fontSize: 12 }}
              axisLine={{ stroke: "var(--color-border)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "var(--color-text-muted)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(79, 70, 229, 0.06)" }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-card)",
              }}
            />
            <Bar dataKey="value" fill="var(--color-primary)" radius={[8, 8, 0, 0]} maxBarSize={56} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;
