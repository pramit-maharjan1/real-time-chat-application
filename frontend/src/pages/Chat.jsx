import { useEffect, useState, useRef } from "react";
import socket from "../services/socket";
import axios from "axios";
import "./Chat.css";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // stats state
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMessages: 0,
  });

  // reference for auto scroll
  const messagesEndRef = useRef(null);

  // get logged in user
  const user = JSON.parse(localStorage.getItem("user")) || {};

  // logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.reload();
  };

  // LOAD CHAT HISTORY
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/messages")
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // LOAD STATS
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/stats")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // SOCKET LISTENER
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);

      // update message count live
      setStats((prev) => ({
        ...prev,
        totalMessages: prev.totalMessages + 1,
      }));
    });

    return () => socket.off("receive_message");
  }, []);

  // AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // SEND MESSAGE
  const sendMessage = () => {

    if (!message.trim()) return;

    const data = {
      sender: user.name,
      message: message,
    };

    socket.emit("send_message", data);

    setMessage("");
  };

  return (
    <div className="chat-container">

      <div className="chat-title">

        <h2>Chat App</h2>

        <button onClick={logout}>
          Logout
        </button>

      </div>

      <div className="stats-box">
        <p>Total Users: {stats.totalUsers}</p>
        <p>Total Messages: {stats.totalMessages}</p>
      </div>

      <div className="message-box">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={
              msg.sender === user.name
                ? "my-message"
                : "other-message"
            }
          >
            <div
              className={`message ${
                msg.sender === user.name
                  ? "my-bubble"
                  : "other-bubble"
              }`}
            >
              <b>{msg.sender}</b>

              <div>{msg.message}</div>

            </div>
          </div>
        ))}

        <div ref={messagesEndRef}></div>

      </div>

      <div className="input-area">

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
        />

        <button onClick={sendMessage}>
          Send
        </button>

      </div>

    </div>
  );
}