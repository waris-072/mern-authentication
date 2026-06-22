import { NAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX } from "../utils/validator.js";

export const validateRegister = ( req, res, next) => {
  const {name, email, password, confirmPassword} = req.body;

  if (!name || !email || !password || !confirmPassword){
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (!NAME_REGEX.test(name)) {
    return res.status(400).json({
      success: false,
      message: "Invalid name format",
    });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({
      success: false,
      message:
        "Password must contain uppercase, lowercase, number and special character",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match",
    });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({
      success: false,
      message: "Invalid password format",
    });
  }

  next();
};