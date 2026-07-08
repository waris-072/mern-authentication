import bcrypt from "bcrypt";
import User from "../models/User.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import { generateAccessToken } from "../utils/generateAccessToken.js";
import { generateRefreshToken } from "../utils/generateRefreshToken.js";
import { generateResetToken } from "../utils/generateResetToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import { passwordResetTemplate } from "../utils/emailTemplate.js";
import { generateOTP } from "../utils/generateOTP.js";
import { verifyEmailTemplate } from "../utils/emailTemplate.js";

export const registerUser = async ({ name, email, password,}) => {
  const existingUser = await User.findOne({
      email: email.trim().toLowerCase(),
    });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: hashedPassword,
  });

  const { otp, hashedOTP } = generateOTP();

  user.emailVerificationCode = hashedOTP;
  user.emailVerificationExpires = Date.now() + 15 * 60 * 1000;

  await user.save();

  try {
    await sendEmail({
      to: user.email,
      subject: "Verify Your Email",
      html: verifyEmailTemplate(otp),
    });
  } catch (err) {
    await User.findByIdAndDelete(user._id);
    console.error("Error sending verification email:", err);
    throw new Error(err.message);
  }

  return {id: user._id, name: user.name, email: user.email, };
};

export const loginUser = async({email, password}) =>{
  if(!email || !password){
    throw new Error("Email and Password required");
  }

  const user = await User.findOne({email});
  if(!user){ throw new Error("Invalid email"); }

  if (!user.isVerified) {
    const error = new Error( "Please verify your email before logging in." );

    error.verificationRequired = true;
    error.email = user.email;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch){
    throw new Error("Invalid Password");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  user.refreshToken = refreshToken;
  await user.save();
   return { user, accessToken, refreshToken, };

};

export const logoutUser = async (userId) => {
  await User.findByIdAndUpdate(userId, {
    refreshToken: null,
  });
};

export const refreshUserToken = async (refreshToken) => {
  if (!refreshToken) {
      throw new Error("Refresh token not found");
  }
  const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
  );
  const user = await User.findById(decoded.id);
  if (!user) {
      throw new Error("User not found");
  }
  if (user.refreshToken !== refreshToken) {
      throw new Error("Invalid refresh token");
  }
  
   // Generate NEW tokens (rotation)
  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  // Store the new refresh token
  user.refreshToken = newRefreshToken;
  await user.save();

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

export const forgotPassword = async (email) => {
  const user = await User.findOne({email: email.trim().toLowerCase(), });
  if (!user) {return;};

  const { resetToken, hashedToken } = generateResetToken();
  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = Date.now() + 15 * 60 * 1000;
  await user.save();

  const resetURL =`${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  await sendEmail({
    to: user.email,
    subject: "Reset Your Password",
    html: passwordResetTemplate(resetURL),
  });

};

export const resetPassword = async (token,password) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    throw new Error( "Invalid or expired reset token." );
  }

  user.password = await bcrypt.hash(password, 10);

  user.passwordResetToken = null;
  user.passwordResetExpires = null;
  user.refreshToken = null;
  await user.save();

};

export const oauthLogin = async (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return {
    accessToken,
    refreshToken,
  };
};

export const verifyEmail = async ({ email, otp }) => {
  const hashedOTP = crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex");

  const user = await User.findOne({
    email: email.trim().toLowerCase(),
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.isVerified) {
    throw new Error("Email already verified");
  }

  if (!user.emailVerificationCode) {
    throw new Error("Verification code not found");
  }

  if (user.emailVerificationExpires < Date.now()) {
    throw new Error("Verification code expired");
  }

  if (user.emailVerificationCode !== hashedOTP) {
    throw new Error("Invalid verification code");
  }

  user.isVerified = true;
  user.emailVerificationCode = null;
  user.emailVerificationExpires = null;

  await user.save();

  return user;
};

export const resendVerificationCode = async (email) => {
  const user = await User.findOne({
    email: email.trim().toLowerCase(),
  });

  if (!user) {
    throw new Error("User not found.");
  }

  if (user.isVerified) {
    throw new Error("Email already verified.");
  }

  const { otp, hashedOTP } = generateOTP();

  user.emailVerificationCode = hashedOTP;
  user.emailVerificationExpires = Date.now() + 3 * 60 * 1000;

  await user.save();

  await sendEmail({
    to: user.email,
    subject: "Verify Your Email",
    html: verifyEmailTemplate(otp),
  });

  return;
};