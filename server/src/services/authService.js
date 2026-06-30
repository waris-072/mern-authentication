import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/generateAccessToken.js";
import { generateRefreshToken } from "../utils/generateRefreshToken.js";

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

  return {id: user._id, name: user.name, email: user.email, };
};

export const loginUser = async({email, password}) =>{
  if(!email || !password){
    throw new Error("Email and Password required");
  }

  const user = await User.findOne({email});
  if(!user){
    throw new Error("Invalid email");
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