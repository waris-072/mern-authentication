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

export const toggleUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if(req.user.id === req.params.id){
      return res.status(400).json({
          success:false,
          message:"You cannot change your own role"
      });
    }

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.role = user.role === "admin" ? "user" : "admin";
    await user.save();

    res.status(200).json({
      message: "Role updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) =>{
  try{
    const {id} = req.params;
    if(req.user.id === id){
      return res.status(400).json({
        success: false,
        message: "You can't delete your own account.",
      });
    }

    const user = await User.findById(id);
    if(!user){
      return res.status(404).json({
        success: false,
        message:"User not found.",
      });
    }

    await User.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  }catch(error){
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
}