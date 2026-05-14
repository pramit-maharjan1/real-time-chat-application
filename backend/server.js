const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const messageRoutes = require("./routes/messageRoutes");
const statsRoutes = require("./routes/statsRoutes");
const userRoutes = require("./routes/userRoutes");

const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");

// 👉 ADD MESSAGE MODEL (IMPORTANT for Day 2)
const Message = require("./models/Message");

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());


// routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/users", userRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API Running");
});

// protected route
app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

// create HTTP server
const server = http.createServer(app);

// initialize socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// socket connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // JOIN EVENT (optional but good practice)
  socket.on("join", (userId) => {
    console.log(`User joined: ${userId}`);
  });

  // SEND MESSAGE
  socket.on("send_message", async (data) => {
    try {
      console.log("Message received:", data);

      // 👉 SAVE MESSAGE TO DATABASE (NEW IMPORTANT PART)
      const savedMessage = await Message.create({
        sender: data.sender,
        message: data.message,
      });

      // 👉 broadcast saved message (NOT raw data)
      io.emit("receive_message", savedMessage);

    } catch (error) {
      console.log("Socket error:", error.message);
    }
  });

  // DISCONNECT
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// port
const PORT = process.env.PORT || 5001;

// DB + server start
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.log("DB Error:", error.message);
  }
};

connectDB();