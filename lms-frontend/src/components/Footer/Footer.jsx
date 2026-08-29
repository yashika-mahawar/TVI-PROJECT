import "./Footer.css";
import { FaInstagram, FaLinkedin, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from "../../assets/tvi-logo.webp";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* About */}
        <div className="footer-section footer-brand">
          <img src={logo} alt="TVI Academy" className="footer-logo" />
          <p>
            TVI Academy is an online learning platform where students get
            live &amp; recorded lectures from expert faculty and earn
            verified certificates — learn anytime, anywhere.
          </p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/your-account-handle" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Platform</h3>
          <ul>
<li><Link to="/certification">Certification</Link></li>
<li><Link to="/pricing">Pricing</Link></li>
<li><Link to="/enroll">How to Enroll</Link></li>
<li><Link to="/about">About Us</Link></li>
<li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p><FaMapMarkerAlt /> Jaipur, Rajasthan, India</p>
          <p><FaEnvelope /> hello@tviacademy.in</p>
          <p><FaPhone /> +91 98765 43210</p>
        </div>

      </div>

      <hr />

      <div className="footer-bottom">
        <p>© 2026 TVI Academy — a product of True Value Infosoft. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;