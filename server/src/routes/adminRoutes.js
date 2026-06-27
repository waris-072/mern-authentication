import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import { getAllUsers, getAdminDashboard, toggleUserRole, deleteUser } from "../controllers/adminController.js";

const router = express.Router();

router.get( "/dashboard", authMiddleware, roleMiddleware("admin"), getAdminDashboard);
router.get("/", authMiddleware, roleMiddleware("admin"), getAllUsers);
router.patch("/users/:id/role", authMiddleware, roleMiddleware("admin"), toggleUserRole);
router.delete("/users/:id", authMiddleware, roleMiddleware("admin"), deleteUser);

export default router;