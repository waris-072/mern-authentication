import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import { getAllUsers, getAdminDashboard } from "../controllers/adminController.js";

const router = express.Router();

router.get( "/dashboard", authMiddleware, roleMiddleware("admin"), getAdminDashboard);
router.get("/", authMiddleware, roleMiddleware("admin"), getAllUsers);

export default router;