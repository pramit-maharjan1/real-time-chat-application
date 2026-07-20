import { useState } from "react";
import axios from "axios";

export default function Register({ setShowRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:5001/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      // optional auto-login data save
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // GO BACK TO LOGIN PAGE AFTER SUCCESS
      setShowRegister(false);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleRegister();
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Create account</h2>
      <p className="auth-subtitle">Get started with Real Time Chat</p>

      {error && <div className="auth-error">{error}</div>}

      <div className="auth-form">
        <div className="auth-input-group">
          <label htmlFor="register-name">Name</label>
          <input
            id="register-name"
            className="auth-input"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="auth-input-group">
          <label htmlFor="register-email">Email</label>
          <input
            id="register-email"
            className="auth-input"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="auth-input-group">
          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            className="auth-input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button className="auth-button" onClick={handleRegister}>
          Sign Up
        </button>
      </div>

      <p className="auth-footer">
        Already have an account?{" "}
        <span className="auth-link" onClick={() => setShowRegister(false)}>
          Login
        </span>
      </p>
    </div>
  );
}