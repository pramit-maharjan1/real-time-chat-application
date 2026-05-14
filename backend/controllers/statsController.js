const User = require("../models/User");
const Message = require("../models/Message");

const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalChats = await Message.countDocuments();

    res.json({
      totalUsers,
      totalChats,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getStats,
};