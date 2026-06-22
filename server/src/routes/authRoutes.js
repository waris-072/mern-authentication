import express from "express";
import { register, login } from "../controllers/authController.js";
import { validateRegister, validateLogin } from "../middleware/validateMiddleware.js";

const router = express.Router();

                //req > middleware > routeHandler 
router.post("/register", validateRegister, register); 
router.post("/login", validateLogin, login );

export default router;