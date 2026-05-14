import { useState } from "react";
import axios from "axios";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", {
        email,
        password,
      });

      // SAVE TOKEN + USER
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setIsLoggedIn(true);

    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}