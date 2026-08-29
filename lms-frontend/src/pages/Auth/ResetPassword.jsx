import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";
import API from "../../services/api";
function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  useEffect(() => { if (!email) navigate("/forgot-password"); }, [email, navigate]);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await API.post(
  "/api/auth/reset-password",
  {
    email,
    newPassword,
  }
);
      alert("Password Reset Successfully!");
      navigate("/login");
    } catch (err) { alert("Failed to reset password."); }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Reset Password</h2>
        <form onSubmit={handleReset}>
          <input type="password" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} required />
          <button type="submit">Update Password</button>
        </form>
      </div>
    </div>
  );
}
export default ResetPassword;