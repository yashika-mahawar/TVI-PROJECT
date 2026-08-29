import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaBell,
  FaUserCircle,
  FaChevronDown,
  FaSignOutAlt,
} from "react-icons/fa";
import API from "../../services/api";
import "./AdminHeader.css";

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

function AdminHeader({ searchTerm = "", setSearchTerm, placeholder = "Search..." }) {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await API.get("/admin/notifications");
        setNotifications(
          dedupeNotifications(res.data.notifications || []).slice(0, MAX_VISIBLE_NOTIFICATIONS)
        );
      } catch (error) {
        console.log("Notification Error:", error);
      }
    };

    fetchNotifications();
  }, []);

  const admin = {
    name: "Administrator",
    email: "admin@tviacademy.in",
  };

  const logout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

  return (
    <header className="admin-header">
      <div className="admin-search">
        <FaSearch className="admin-search__icon" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
        />
      </div>

      <div className="admin-right">
        <div className="admin-notification">
          <button
            className="header-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FaBell />
            <span className="notify-dot"></span>
          </button>

          {showNotifications && (
            <div className="notification-box">
              <h4>Notifications</h4>

              {notifications.length === 0 ? (
                <p className="notification-box__empty">No new notifications</p>
              ) : (
                notifications.map((item) => (
                  <div key={item.id} className="notification-item">
                    <p>{item.message}</p>
                    <small>{new Date(item.created_at).toLocaleDateString()}</small>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="admin-profile">
          <button className="profile-btn" onClick={() => setShowProfile(!showProfile)}>
            <FaUserCircle size={35} />
            <div>
              <strong>{admin.name}</strong>
              <small>Administrator</small>
            </div>
            <FaChevronDown />
          </button>

          {showProfile && (
            <div className="profile-box">
              <h3>{admin.name}</h3>
              <p>{admin.email}</p>
              <hr />
              <button onClick={logout}>
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
