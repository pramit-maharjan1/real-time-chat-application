const express = require("express");
const router = express.Router();

const Message = require("../models/Message");

// GET all messages (chat history)
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });

    res.status(200).json(messages);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;