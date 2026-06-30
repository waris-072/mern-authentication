import express from "express";
import { register, login, logout, getProfile, refreshAccessToken, } from "../controllers/authController.js";
import { validateRegister, validateLogin } from "../middleware/validateMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

                //req > middleware > routeHandler 
router.post("/register", validateRegister, register); 
router.post("/login", validateLogin, login );
router.post("/logout", authMiddleware, logout);
router.get("/profile", authMiddleware, getProfile);
router.post("/refresh", refreshAccessToken);


export default router;