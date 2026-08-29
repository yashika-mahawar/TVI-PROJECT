import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import API from "../../../../services/api";
import "./AdminActivity.css";

const MAX_VISIBLE_NOTIFICATIONS = 6;

const dedupeNotifications = (list) => {
  const seen = new Set();
  const unique = [];

  for (const note of list) {
    const key = note.message?.trim().toLowerCase();

    if (seen.has(key)) continue;

    seen.add(key);
    unique.push(note);
  }

  return unique;
};

const AdminActivity = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await API.get("/admin/notifications");
        setNotifications(
          dedupeNotifications(res.data.notifications || []).slice(0, MAX_VISIBLE_NOTIFICATIONS)
        );
      } catch (err) {
        console.log("AdminActivity notifications error:", err);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="admin-activity">
      <h3 className="admin-panel-title">
        <span className="admin-panel-title-icon"><FaBell /></span>
        Recent Activity
      </h3>

      <div className="admin-activity__list">
        {notifications.length === 0 ? (
          <p className="admin-activity__empty">No recent activity to show.</p>
        ) : (
          notifications.map((note) => (
            <div key={note.id} className="admin-activity__item">
              <p>{note.message}</p>
              <small>{new Date(note.created_at).toLocaleDateString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminActivity;
