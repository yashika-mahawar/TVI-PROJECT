import React, { useState, useEffect } from "react";
import "./Header.css";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import axios from "axios";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
const [results, setResults] = useState([]);
  const [showProfileBox, setShowProfileBox] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

const [notifications, setNotifications] = useState([]);
const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("user");

  return savedUser
    ? JSON.parse(savedUser)
    : {
        full_name: "Guest",
        profile_image: "",
      };
});

useEffect(() => {
  const updateUser = () => {
  const savedUser = localStorage.getItem("user");

  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }
};

  updateUser();

  window.addEventListener("userUpdated", updateUser);

  return () => {
    window.removeEventListener("userUpdated", updateUser);
  };
}, []);
const searchItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "My Courses", path: "/my-courses" },
  { name: "Profile", path: "/profile" },
  { name: "Assignments", path: "/assignments" },
  { name: "Progress", path: "/progress" },
  { name: "Live Classes", path: "/live-classes" },
];
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

const fetchNotifications = async () => {
  try {

    const savedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (!savedUser?.id) return;

    const res = await API.get(`/notifications/${user.id}`);

setNotifications(dedupeNotifications(res.data.notifications || []));
  } catch (err) {

    console.log(err);

  }
};
useEffect(() => {
  if (search.trim() === "") {
    setResults([]);
    return;
  }

  const filtered = searchItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  setResults(filtered);
}, [search]);
useEffect(() => {
  fetchNotifications();

  const interval = setInterval(() => {
    fetchNotifications();
  }, 5000);

  return () => clearInterval(interval);
}, []);
  return (
    <header className="dashboard-header">
      <div className="search-box">
        <FaSearch className="search-icon" />
        <input
  type="text"
  placeholder="Search your courses, assignments, updates..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
{results.length > 0 && (
  <div className="search-dropdown">

    {results.map((item) => (

      <div
        key={item.path}
        className="search-item"
        onClick={() => {
          navigate(item.path);
          setSearch("");
          setResults([]);
        }}
      >

        {item.name}

      </div>

    ))}

  </div>
)}
      </div>

      <div className="header-right">
        <div className="notification" title="Notifications">

  <FaBell
    className="bell-icon"
    onClick={() =>
      setShowNotifications(!showNotifications)
    }
  />

  <span className="badge">
  {notifications.filter((note) => !note.is_read).length}
</span>

  {showNotifications && (

    <div className="notification-dropdown">

      <h4 className="notification-dropdown__heading">Notifications</h4>

{notifications.length === 0 ? (
        <p className="notification-dropdown__empty">You're all caught up — no new notifications.</p>

      ) : (

notifications.slice(0, MAX_VISIBLE_NOTIFICATIONS).map((note) => (
          <div
            key={note.id}
            className="notification-dropdown__item"
          >

            <p>{note.message}</p>

            <small>

              {new Date(
                note.created_at
              ).toLocaleDateString()}

            </small>

          </div>

        ))

      )}

    </div>

  )}

</div>

        {/* Profile Segment */}
        <div
          className="profile"
          title="View Profile"
          onClick={() => setShowProfileBox(!showProfileBox)}
        >
          <div className="profile-avatar-wrapper">
            {user.profile_image ? (
  <img
    src={user.profile_image}
    alt="Profile"
  />
) : (
              <FaUserCircle className="avatar-svg" size={40} />
            )}
          </div>
          <div className="profile-info-text">
            {/* Yahan 'Yashika' ki jagah dynamic {userName} use kiya hai */}
            <span className="user-name">{user.full_name}</span>
            <span className="user-role">Student Portal</span>
          </div>
        </div>

        {/* Dropdown Box */}
        {showProfileBox && (
          <div
            style={{
              position: "absolute",
              top: "70px",
              right: "20px",
              width: "260px",
              background: "#ffffff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              border: "1px solid #e2e8f0",
              zIndex: 1000,
              color: "#333"
            }}
          >
            <div style={{ fontSize: "0.9rem", color: "#475569", lineHeight: "2" }}>
              <p style={{ margin: 0 }}><strong>Name:</strong>{user.full_name}</p>
              <p style={{ margin: 0 }}><strong>Roll No:</strong> ICFAI-2026-001</p>
              <p style={{ margin: 0 }}><strong>Course:</strong> {user.program}</p>
            </div>
            <button
              className="profile-dropdown__close-btn"
              onClick={() => setShowProfileBox(false)}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
