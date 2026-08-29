import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import API from "../../services/api";
function ForgotPassword() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post(
  "/api/auth/forgot-password",
  { phone }
);
      alert("OTP sent to your WhatsApp number!");
      navigate("/verify-otp", { state: { email: res.data.email, phone } });
    } catch (err) {
      alert(err.response?.data?.message || "No account found with this WhatsApp number!");
    }
    finally { setLoading(false); }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        <p className="auth-card-subtitle">
          Enter the WhatsApp number linked to your account and we'll send a verification code to it.
        </p>
        <form onSubmit={handleSendOTP}>
          <input
            type="tel"
            placeholder="Enter your WhatsApp number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>{loading ? "Sending..." : "Send OTP via WhatsApp"}</button>
        </form>
      </div>
    </div>
  );
}
export default ForgotPassword;
