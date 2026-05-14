import { useState } from "react";
import axios from "axios";

export default function Register({ setIsLoggedIn, setShowRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5001/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert("User registered successfully");

      // optional auto-login data save
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 🔥 GO BACK TO LOGIN PAGE AFTER SUCCESS
      setShowRegister(false);

    } catch (err) {
      console.log(err.response?.data?.message || "Register error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleRegister}>
        Sign Up
      </button>

      {/* 🔥 THIS ALSO GOES TO LOGIN PAGE */}
      <p
        style={{
          marginTop: "15px",
          color: "blue",
          cursor: "pointer",
          textDecoration: "underline",
        }}
        onClick={() => setShowRegister(false)}
      >
        Already have an account? Login
      </p>
    </div>
  );
}