import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBook,
  FaVideo,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBroadcastTower,
  FaTasks,
} from "react-icons/fa";
import "./QuickActions.css";

const ACTIONS = [
  { label: "Manage Courses", icon: <FaBook />, path: "/admin/manage-courses" },
  { label: "Manage Videos", icon: <FaVideo />, path: "/admin/videos" },
  { label: "Manage Students", icon: <FaUserGraduate />, path: "/admin/students" },
  { label: "Manage Faculty", icon: <FaChalkboardTeacher />, path: "/admin/faculty" },
  { label: "Live Classes", icon: <FaBroadcastTower />, path: "/admin/live-classes" },
  { label: "Assignments", icon: <FaTasks />, path: "/admin/assignments" },
];

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-quick-actions">
      {ACTIONS.map((action) => (
        <button
          key={action.path}
          className="admin-quick-action-tile"
          onClick={() => navigate(action.path)}
        >
          <span className="admin-quick-action-icon">{action.icon}</span>
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
