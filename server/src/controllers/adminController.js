import User from "../models/User.js";

export const getAdminDashboard = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Welcome Admin",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};