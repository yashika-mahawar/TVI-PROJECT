import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../services/api"; // (path apne folder structure ke hisaab se check kar lena)
import {
  FaGraduationCap,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaBookOpen,
  FaVideo,
  FaCertificate,
} from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Chrome ignores autocomplete="off" on login fields when it has a saved
  // password for this site, and silently fills them right after mount.
  // Force them back to empty once that autofill pass has happened.
  useEffect(() => {
    const timer = setTimeout(() => {
      setEmail("");
      setPassword("");
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/auth/login`,
  {
    email,
    password,
  }
);

    if (res.data.success) {

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful!");

      navigate("/dashboard");

    } else {
      alert("Invalid Email or Password");
    }

  } catch (error) {
  console.log("Full Error:", error);
  console.log("Backend Response:", error.response?.data);

  alert(
    error.response?.data?.message ||
    error.response?.data?.error ||
    "Login Failed"
  );
}

  setLoading(false);
};
  return (
    <div className="login-container">
      <div className="login-left">
        <div className="auth-blob auth-blob-1"></div>
        <div className="auth-blob auth-blob-2"></div>

        <div className="auth-brand">
          <FaGraduationCap />
          <span>TVI Academy</span>
        </div>

        <h2>Welcome Back!</h2>
        <p>Login to access your dashboard, courses, live classes and learning resources.</p>

        <ul className="auth-highlights">
          <li>
            <FaBookOpen />
            <span>Track your course progress in real time</span>
          </li>
          <li>
            <FaVideo />
            <span>Join live classes with your faculty</span>
          </li>
          <li>
            <FaCertificate />
            <span>Earn certificates as you complete courses</span>
          </li>
        </ul>
      </div>

      <div className="login-right">
        <div className="login-form">
          <span className="auth-form-badge">Student Login</span>
          <h2>Sign in to your account</h2>
          <p className="auth-form-subtitle">Enter your details to continue learning.</p>

          <form onSubmit={handleLogin} autoComplete="off">
            <div className="auth-input-group">
              <FaEnvelope className="auth-input-icon" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                required
              />
            </div>

            <div className="auth-input-group">
              <FaLock className="auth-input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                required
              />
              <button
                type="button"
                className="auth-toggle-visibility"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Remember Me</span>
              </label>
              <Link to="/forgot-password" className="auth-link">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p>
            Don't have an account?
            <Link to="/signup"> Register</Link>
          </p>

          <div className="auth-admin-note">
            <p>
              Are you an administrator?
              <Link to="/admin/login" className="auth-admin-link">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
