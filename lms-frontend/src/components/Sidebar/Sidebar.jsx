import "./Sidebar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBookOpen,
  FaClipboardList,
  FaChartLine,
  FaUserGraduate,
  FaVideo,
  FaSignOutAlt,
  FaUsers,
  FaPlus,
  FaFileAlt,
  FaCalendarAlt,
  FaChalkboardTeacher
} from "react-icons/fa";

function Sidebar({ isAdmin }) {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Student Menu Items
  const studentMenu = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "My Courses", path: "/my-courses", icon: <FaBookOpen /> },
    { name: "Profile", path: "/profile", icon: <FaUserGraduate /> },
    { name: "Assignments", path: "/assignments", icon: <FaClipboardList /> },
    { name: "Progress", path: "/progress", icon: <FaChartLine /> },
    { name: "Live Classes", path: "/live-classes", icon: <FaVideo style={{ color: "#ef4444" }} /> },
  ];

  // 2. Admin Menu Items
  const adminMenu = [
    { name: "Dashboard", path: "/admin", icon: <FaHome /> },
    // 🔥 Yahan path update kar diya hai:
    { name: "Manage Courses", path: "/admin/manage-courses", icon: <FaBookOpen /> }, 

    { name: "Manage Videos", path: "/admin/videos", icon: <FaPlus /> },
    {
    name: "Manage Assignments",
    path: "/admin/assignments",
    icon: <FaFileAlt />,
  },
    { name: "Manage Students", path: "/admin/students", icon: <FaUsers /> },
    { name: "Live Classes", path: "/admin/live-classes", icon: <FaCalendarAlt /> },
    { name: "Manage Faculty", path: "/admin/faculty", icon: <FaChalkboardTeacher /> },
  ];

  const menuItems = isAdmin ? adminMenu : studentMenu;

  // Logout ka secure handle
  const handleLogout = () => {
    if (isAdmin) {
      localStorage.removeItem("isAdmin"); 
      navigate("/admin/login");
    } else {
      localStorage.removeItem("user"); 
      navigate("/login");
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo" style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
        <img
          src="/tvi-logo.webp"
          alt="TVI Academy"
          style={{ width: '160px', height: 'auto' }}
        />
      </div>

      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? "active" : ""}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Section */}
      <div style={{ marginTop: "auto", paddingBottom: "20px" }}>
        <div 
          onClick={handleLogout} 
          className="logout-btn" 
          style={{ 
            cursor: 'pointer',
            textDecoration: 'none', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            padding: '12px',
            margin: '0 20px',
            background: '#ef4444',
            color: 'white',
            borderRadius: '10px',
            fontWeight: '600',
            justifyContent: 'center'
          }}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;