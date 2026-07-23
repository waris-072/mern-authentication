import { registerUser, loginUser, logoutUser, refreshUserToken, forgotPassword, resetPassword } from "../services/authService.js";
import { verifyEmail } from "../services/authService.js";
import { resendVerificationCode } from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const result = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { user, accessToken, refreshToken } = await loginUser(req.body);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {id:user._id, name:user.name, email:user.email, role:user.role},
    });
  } catch (error) {
    const statusCode = error.locked ? 423 : 400;
    res.status(statusCode).json({
      success: false,
      message: error.message,
      verificationRequired: error.verificationRequired || false,
      email: error.email || null,
      locked: error.locked || false,
      lockUntil: error.lockUntil || null,
    });
  }
};

export const logout = async (req, res) => {
  await logoutUser(req.user._id)

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

// export const getProfile = (req, res) => {
//   res.status(200).json({
//     success: true,
//     user: req.user,
//   });
// };

export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    const tokens = await refreshUserToken(refreshToken);

    res.cookie("accessToken", tokens.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Token refreshed",
    });

  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    await forgotPassword(req.body.email);

    res.status(200).json({
      success: true,
      message:"If an account with that email exists, a reset link has been sent.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    await resetPassword( req.params.token, req.body.password );

    res.status(200).json({
      success: true,
      message: "Password reset successful. Please login again.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyEmailController = async (req, res) => {
  try {
    await verifyEmail(req.body);

    res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const resendVerification = async (req, res) => {
  try {
    await resendVerificationCode(req.body.email);

    res.json({
      success: true,
      message: "Verification code sent.",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};