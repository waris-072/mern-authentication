import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";

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

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { user, token };

};