import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import "./Notifications.css";
import API from "../../../services/api";

const MAX_VISIBLE_NOTIFICATIONS = 5;

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

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        const res = await API.get(`/notifications/${user.id}`);
setNotifications(dedupeNotifications(res.data.notifications || []).slice(0, MAX_VISIBLE_NOTIFICATIONS));
      } catch (err) {
        console.log(err);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notifications-card-inner">
      <h3 className="sub-module-title">
        <span className="sub-module-icon"><FaBell /></span>
        Notifications
      </h3>

      <div className="notifications-stack">
        {notifications.length === 0 ? (
          <p className="empty-state-text">You're all caught up — no new notifications.</p>
        ) : (
          notifications.map((note) => (
  <div key={note.id} className="alert-box">
    <p className="alert-desc">{note.message}</p>

    <small
      style={{
        color: "#777",
        display: "block",
        marginTop: "6px",
      }}
    >
      {new Date(note.created_at).toLocaleDateString()}
    </small>
  </div>
))
        )}
      </div>
    </div>
  );
};

export default Notifications;