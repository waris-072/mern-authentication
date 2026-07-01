import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getProfileController } from "../controllers/userController.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfileController);

export default router;