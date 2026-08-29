import React, { useEffect } from "react";
import "./PaymentSuccess.css";
import { useLocation, useNavigate } from "react-router-dom";
import Confetti from 'react-confetti';
import { enrollCourse } from "../../utils/enroll"; // ✅ Import Added
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  // ✅ SECURITY FIX: Enrollment sirf success page load hone par trigger hogi
 useEffect(() => {
  if (course) {
    console.log("Payment Success Course:", course);

    enrollCourse(course);

    console.log(
      JSON.parse(localStorage.getItem("myCourses"))
    );
  }
}, [course]);

  // Agar bina payment kiye koi direct is page pe aaye
  if (!course) {
    return (
      <>
        <Navbar />
        <div className="success-page">
          <div className="success-card">
            <h1>Oops! 🚫</h1>
            <p>No payment record found.</p>
            <button className="primary-btn" onClick={() => navigate("/")}>
              Back to Home
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="success-page">
        <Confetti recycle={false} numberOfPieces={300} />
        <div className="success-card">
          <div className="check">✔</div>
          <h1>Payment Successful! 🎉</h1>
          <p>Your enrollment in <strong>{course.title}</strong> is confirmed.</p>

          {course && (
            <div className="course-info">
              <div className="receipt-details">
                <p><strong>Order ID:</strong> #RZP_{Math.floor(Math.random() * 900000)}</p>
                <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                <p><strong>Status:</strong> Completed</p>
              </div>
            </div>
          )}

          <button className="primary-btn" onClick={() => navigate("/my-courses")}>
            Go to My Courses
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PaymentSuccess;