import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";
import API from "../../services/api";
function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const phone = location.state?.phone;

  useEffect(() => {
    if (!email || !phone) navigate("/forgot-password");
  }, [email, phone, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setVerifying(true);
    try {
      const res = await API.post(
  "/api/auth/verify-otp",
  { email, otp }
);
      if (res.data.success) navigate("/reset-password", { state: { email } });
    } catch (err) {
      alert(err.response?.data?.message || "Invalid or Expired OTP!");
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await API.post("/auth/forgot-password", { phone });
      alert("A new OTP has been sent to your WhatsApp number!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Verify OTP</h2>
        <p className="auth-card-subtitle">
          Enter the 6-digit code sent to your WhatsApp number <strong>{phone}</strong>.
        </p>
        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            required
          />
          <button type="submit" disabled={verifying}>{verifying ? "Verifying..." : "Verify"}</button>
        </form>
        <button
          type="button"
          className="auth-card-link-btn"
          onClick={handleResend}
          disabled={resending}
        >
          {resending ? "Resending..." : "Didn't get it? Resend OTP"}
        </button>
      </div>
    </div>
  );
}
export default VerifyOTP;
