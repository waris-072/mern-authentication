import { getProfile } from "../services/userService.js";

export const getProfileController = async (req, res) => {
  try {
    const user = await getProfile(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};