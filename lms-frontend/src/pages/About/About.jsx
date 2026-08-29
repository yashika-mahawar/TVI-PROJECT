import React from "react";
import "./About.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {
  FaGraduationCap,
  FaBullseye,
  FaEye,
  FaBookOpen,
  FaUsers,
  FaAward,
  FaCertificate,
  FaVideo,
  FaGlobe,
} from "react-icons/fa";

function About() {
  return (
    <div className="about-page">
      <Navbar />
      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="hero-content">
          <span>Welcome to TVI Academy</span>
          <h1>Live Lectures, Real Faculty,<br />Certificates That Count</h1>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="about-intro">
        <div className="about-left">
          <div className="about-stat-panel">
            <div className="about-stat-blob"></div>
            <FaGraduationCap className="about-stat-icon" />
            <div className="about-stat-grid">
              <div>
                <h3>10K+</h3>
                <p>Students Taught</p>
              </div>
              <div>
                <h3>50+</h3>
                <p>Live Courses</p>
              </div>
              <div>
                <h3>200+</h3>
                <p>Certificates Issued</p>
              </div>
              <div>
                <h3>95%</h3>
                <p>Completion Rate</p>
              </div>
            </div>
          </div>
        </div>
        <div className="about-right">
          <h5>ABOUT TVI ACADEMY</h5>
          <h2>Learning, Reimagined for the Way You Actually Learn</h2>
          <p>
            TVI Academy is an online learning platform built by True Value
            Infosoft with one goal: make high-quality lectures and
            industry-recognized certification accessible to every student,
            wherever they are.
          </p>
          <p>
            Instead of static video libraries, we built a platform around
            live classes with real faculty, structured assignments, and
            progress tracking — so learning actually sticks.
          </p>
          <p>
            Every course ends with an assessment and a verified certificate,
            because we believe a credential should mean something to the
            person reading it, not just the person holding it.
          </p>
          <p>
            Today, thousands of students use TVI Academy to learn new
            skills, finish degree-style programs, and walk away with proof
            of what they know.
          </p>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="vision-mission">
        <div className="vm-card"><FaEye className="vm-icon"/><h3>Vision</h3><p>To become the most trusted platform for live learning and certification in India, respected by students and employers alike.</p></div>
        <div className="vm-card"><FaBullseye className="vm-icon"/><h3>Mission</h3><p>To deliver expert-led lectures and verifiable certification that genuinely improve a student's career prospects.</p></div>
      </section>

      {/* WHY CHOOSE SECTION */}
      <section className="why-section">
        <h2>Why Choose TVI Academy?</h2>
        <div className="why-grid">
          {[
            { icon: <FaVideo />, title: "Live & Recorded Lectures" },
            { icon: <FaBookOpen />, title: "Structured Curriculum" },
            { icon: <FaUsers />, title: "Experienced Faculty" },
            { icon: <FaCertificate />, title: "Verified Certification" },
            { icon: <FaGlobe />, title: "Learn From Anywhere" },
            { icon: <FaAward />, title: "Career-Focused Outcomes" },
          ].map((item, idx) => (
            <div key={idx} className="why-card">
              {item.icon}
              <h4>{item.title}</h4>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
export default About;
