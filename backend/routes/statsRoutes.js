const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Message = require("../models/Message");

// GET STATS
router.get("/", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalMessages = await Message.countDocuments();

    res.status(200).json({
      totalUsers,
      totalMessages,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;