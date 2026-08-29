import React from 'react';
import './Contact.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="contact-page-wrapper">
      <Navbar />
      <div className="contact-page">
        <div className="contact-box">
          <div className="contact-left">
            <h2>Get in Touch</h2>
            <p>Questions about a course, certification, or your enrollment? We're here to help.</p>

            <div className="contact-details">
              <div className="contact-item"><FaMapMarkerAlt className="icon" /> <span>Jaipur, Rajasthan, India</span></div>
              <div className="contact-item"><FaEnvelope className="icon" /> <span>hello@tviacademy.in</span></div>
              <div className="contact-item"><FaPhone className="icon" /> <span>+91 98765 43210</span></div>
            </div>
          </div>

          <form className="contact-right">
            <h3>Send us a Message</h3>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />
            <textarea placeholder="Your message..." rows="5" required></textarea>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Contact;