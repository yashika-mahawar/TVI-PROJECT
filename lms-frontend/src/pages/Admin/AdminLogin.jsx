import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserShield, FaArrowRight } from "react-icons/fa";
import "./AdminLogin.css";
import axios from "axios";
import API from "../../services/api";
const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post(
  "/auth/login",
  {
    email,
    password,
  }
);

    if (res.data.user.role !== "admin") {
      setError("Access Denied! Admin Only.");
      return;
    }

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("admin", JSON.stringify(res.data.user));

    navigate("/admin");

  } catch (err) {
    setError(
      err.response?.data?.message || "Login Failed"
    );
  }
};

  return (
    <div className="admin-login-wrapper">
      <div className="glass-card">
        <div className="admin-avatar">
          <FaUserShield />
        </div>
        <h1>Welcome Admins</h1>
        <p>Authorize to access the management portal</p>
        
        {error && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginBottom: "10px" }}>{error}</p>}
        
        <form onSubmit={handleLogin} autoComplete="off">
          <div className="field">
            <input
              type="email"
              name="admin-login-email"
              placeholder="Admin Email"
              required
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <input
              type="password"
              name="admin-login-password"
              placeholder="Password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-btn">
            Login Securely <FaArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;