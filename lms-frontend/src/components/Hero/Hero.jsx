import "./Hero.css";
import { Link } from "react-router-dom";
import { FaPlay, FaCertificate, FaUsers, FaStar } from "react-icons/fa";

function Hero() {
  return (
    <section className="hero" id="home">

      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      {/* LEFT SIDE */}
      <div className="hero-left">

        <span className="hero-tag">
          🚀 Live Lectures &bull; Verified Certification
        </span>

        <h1>
          Learn Live. Get<br />
          <span>Certified. Grow.</span>
        </h1>

        <p>
          TVI Academy is the all-in-one platform where students watch
          expert-led lectures, join live classes, and earn certificates
          that actually move their career forward.
        </p>

        <div className="hero-buttons">
          <a href="#courses" style={{ textDecoration: "none" }}>
            <button className="primary-btn">Explore Courses</button>
          </a>
          <Link to="/certification" style={{ textDecoration: "none" }}>
            <button className="secondary-btn">See Certification</button>
          </Link>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <h3>10K+</h3>
            <p>Students</p>
          </div>

          <div className="stat">
            <h3>50+</h3>
            <p>Courses</p>
          </div>

          <div className="stat">
            <h3>95%</h3>
            <p>Success Rate</p>
          </div>
        </div>

      </div>

      {/* RIGHT SIDE — SaaS product mockup, no stock photos */}
      <div className="hero-right">
        <div className="image-wrapper">

          <div className="mock-topbar">
            <span className="mock-dot red"></span>
            <span className="mock-dot yellow"></span>
            <span className="mock-dot green"></span>
          </div>

          <div className="mock-player">
            <div className="mock-play-btn"><FaPlay /></div>
            <div className="mock-waves">
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={i} style={{ "--i": i }}></span>
              ))}
            </div>
          </div>

          <div className="mock-progress">
            <div className="mock-progress-bar"></div>
          </div>

          <div className="mock-info-row">
            <div className="mock-avatar-group">
              <span></span><span></span><span></span>
            </div>
            <p>Live now &middot; 1,204 learners watching</p>
          </div>

        </div>

        <div className="floating-card card1">
          <FaCertificate /> Certificate Issued
        </div>

        <div className="floating-card card2">
          <FaStar /> 4.9/5 Course Rating
        </div>

        <div className="floating-card card3">
          <FaUsers /> 10,000+ Learners
        </div>
      </div>

    </section>
  );
}

export default Hero;
