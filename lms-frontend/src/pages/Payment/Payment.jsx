import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Payment.css";
import API from "../../services/api";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const course = location.state?.course;

  useEffect(() => {
    if (!course) {
      navigate("/");
    }
  }, [course, navigate]);

  if (!course) return null;

  const handlePayment = async () => {
  setLoading(true);

  try {

    // ₹49,999  ---> 49999
    const amount =
  typeof course.fee === "number"
    ? course.fee
    : Number(String(course.fee).replace(/[₹,]/g, ""));

    console.log("Amount:", amount);

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
console.log("User:", user);
console.log("Token:", token);
const { data } = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/payment/create-order`,
  {
    amount: amount * 100,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: data.amount,
      currency: "INR",
      name: "TVI Academy",
      description: `Enrollment for ${course.title}`,
      order_id: data.id,
handler: async (response) => {
  try {
    const verify = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/payment/verify-payment`,
      {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        user_id: user.id,
    course_id: course.id,
      }
    );

    if (verify.data.success) {
      // --- YAHAN HOGA ENROLLMENT ---
      // Ab hum database mein enrollment record banayenge
      await axios.post(
  `${import.meta.env.VITE_API_URL}/api/enrollments/enroll`, 
        { course_id: course.id }, // Yahan 'course.id' dynamic hai!
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      
      navigate("/payment-success", { state: { course } });
    }
  } catch (err) {
    console.log(err);
    navigate("/payment-failure");
  }
},

      modal: {
        ondismiss() {
          setLoading(false);
        },
      },

      theme: {
        color: "#2563eb",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function () {
      navigate("/payment-failure");
    });

    rzp.open();

  } catch (err) {
    console.log(err);
    alert("Payment Failed");
    setLoading(false);
  }
};
  return (
    <>
      <Navbar />
      <div className="payment-page">
        <h1>Complete Enrollment</h1>
        <div className="payment-container">
          <div className="payment-left">
            <h2>🎓 Your Selection</h2>
            <div className="course-box">
              <h3>{course.title}</h3>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p className="price">{course.fee}</p>
            </div>
          </div>
          <div className="payment-right">
            <h2>💳 Secure Checkout</h2>
            <button className="pay-now-btn" onClick={handlePayment} disabled={loading}>
              {loading ? "Initializing Gateway..." : `Pay ${course.fee} Securely`}
            </button>
            <p className="note">🔒 100% Secure Payment | Powered by Razorpay</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Payment;