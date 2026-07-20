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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat App</h2>
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="stats-box">
        <div className="stat-item">
          Total Users <span className="stat-number">{stats.totalUsers}</span>
        </div>
        <div className="stat-item">
          Total Messages{" "}
          <span className="stat-number">{stats.totalMessages}</span>
        </div>
      </div>

      <div className="message-box">
        {messages.length === 0 ? (
          <div className="empty-state">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg, i) => {
            const isMine = msg.sender === user.name;
            return (
              <div
                key={i}
                className={`message-row ${
                  isMine ? "my-message" : "other-message"
                }`}
              >
                <div
                  className={`message-bubble ${
                    isMine ? "my-bubble" : "other-bubble"
                  }`}
                >
                  {!isMine && (
                    <div className="message-sender">{msg.sender}</div>
                  )}
                  <div>{msg.message}</div>
                  <div className="message-time">
                    {formatTime(msg.createdAt || msg.timestamp)}
                  </div>
                </div>
              </div>
            );
          })
        )}

        <div ref={messagesEndRef}></div>
      </div>

      <div className="input-area">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}