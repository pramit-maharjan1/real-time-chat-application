import { useState } from "react";
import axios from "axios";

export default function Login({ setIsLoggedIn, setShowRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:5001/api/auth/login",
        {
          email,
          password,
        }
      );

      // SAVE TOKEN + USER
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setIsLoggedIn(true);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Welcome back</h2>
      <p className="auth-subtitle">Sign in to continue chatting</p>

      {error && <div className="auth-error">{error}</div>}

      <div className="auth-form">
        <div className="auth-input-group">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            className="auth-input"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="auth-input-group">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            className="auth-input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button className="auth-button" onClick={handleLogin}>
          Login
        </button>
      </div>

      <p className="auth-footer">
        Don't have an account?{" "}
        <span className="auth-link" onClick={() => setShowRegister(true)}>
          Sign up
        </span>
      </p>
    </div>
  );
}