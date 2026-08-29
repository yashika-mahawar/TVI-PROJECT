import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/tvi-logo.webp";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
function Navbar() {

const [search,setSearch] = useState("");
const navigate = useNavigate();
const location = useLocation();

// Home/Courses/Faculty are sections on "/", but the navbar now renders on
// every page. Navigating there and immediately scrolling races the page's
// own render (fonts/images still loading push the section down), so instead
// of a blind setTimeout we hand the target id to Home via router state —
// Home polls for the element once it's actually mounted and scrolls then.
const goToSection = (id) => (e) => {
  e.preventDefault();

  if (location.pathname !== "/") {
    navigate("/", { state: { scrollTo: id } });
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
};

const handleSearch = (e) => {
  if (e.key === "Enter") {
    const value = search.toLowerCase();

    if (value.includes("course")) {
      goToSection("courses")(e);
    } else if (value.includes("faculty")) {
      goToSection("faculty")(e);
    } else if (value.includes("about")) {
      navigate("/about");
    }
  }
};
  return (
    <header className="navbar">
      <Link to="/" className="logo-section">
        <img src={logo} alt="TVI Academy" />
      </Link>

      {/* Search Bar */}
      <div className="search-container">
        <input
  type="text"
  placeholder="Search courses, faculty..."
  className="search-input"
  value={search}
  onChange={(e)=>setSearch(e.target.value)}
  onKeyDown={handleSearch}
/>
      </div>

     <nav>
        <ul className="nav-links">
          {/* Internal section links */}
          <li><a href="#home" onClick={goToSection("home")}>Home</a></li>
          <li><a href="#courses" onClick={goToSection("courses")}>Courses</a></li>

          {/* New Page links (using Link component) */}
          <li><Link to="/certification">Certification</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>


      <div className="nav-buttons">
        <Link to="/login" className="nav-login-btn">Login</Link>
        <Link to="/signup" className="nav-register-btn">Get Started Free</Link>
      </div>

    </header>
  );
}

export default Navbar;