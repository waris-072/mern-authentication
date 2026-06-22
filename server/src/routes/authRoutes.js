import express from "express";
import { register, login, logout, getProfile } from "../controllers/authController.js";
import { validateRegister, validateLogin } from "../middleware/validateMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

                //req > middleware > routeHandler 
router.post("/register", validateRegister, register); 
router.post("/login", validateLogin, login );
router.post("/logout", logout);
router.get("/profile", authMiddleware, getProfile);


export default router;