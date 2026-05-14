const User = require("../models/User");

// GET USERS
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE USER
const updateUser = async (req, res) => {
  try {

    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
      },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE USER
const deleteUser = async (req, res) => {
  try {

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "User deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  getUsers,
  updateUser,
  deleteUser,
};