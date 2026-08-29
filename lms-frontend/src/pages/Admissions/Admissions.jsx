import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Admissions.css';

function Admission() {
  return (
    <div className="admission-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <span className="eyebrow eyebrow-light">Enrollment</span>
          <h1>Enroll Today, Start Learning This Week</h1>
          <p>No entrance exams. No paperwork queues. Just sign up and start.</p>
        </div>
      </section>

      {/* Enrollment Details & Process Section */}
      <section className="admission-content">
        <div className="info-card">
          <h3>How Enrollment Works</h3>
          <ol className="process-list">
            <li><strong>Create Your Account:</strong> Sign up with your email and phone number in under a minute.</li>
            <li><strong>Pick a Course or Plan:</strong> Browse the course catalog or choose a subscription plan that fits you.</li>
            <li><strong>Complete Payment:</strong> Secure checkout confirms your seat instantly.</li>
            <li><strong>Join Your First Class:</strong> Access your dashboard and join a live class or start a recorded lecture right away.</li>
          </ol>
        </div>

        <div className="info-card">
          <h3>What You'll Need</h3>
          <ul className="doc-list">
            <li>A valid email address and phone number</li>
            <li>Basic details (name, highest qualification)</li>
            <li>A device with an internet connection</li>
            <li>A payment method for paid courses (UPI, cards, netbanking)</li>
          </ul>
        </div>
      </section>

      {/* Enrollment Timeline */}
      <section className="calendar-section">
        <h2 className="section-title">Rolling Enrollment — Join Anytime</h2>
        <div className="calendar-grid">
          <div className="calendar-item">
            <h4>Sign Up</h4>
            <p>Open all year round</p>
          </div>
          <div className="calendar-item">
            <h4>Next Live Cohort</h4>
            <p>Starts every Monday</p>
          </div>
          <div className="calendar-item">
            <h4>Certificate Assessment</h4>
            <p>At the end of each course</p>
          </div>
          <div className="calendar-item">
            <h4>Certificate Issued</h4>
            <p>Instantly after you pass</p>
          </div>
        </div>

        <div className="enroll-cta">
          <Link to="/signup" className="btn-gradient">Create Your Account</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Admission;
