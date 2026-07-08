import express from "express";
import { register, login, logout, refreshAccessToken, forgotPasswordController, resetPasswordController} from "../controllers/authController.js";
import { validateRegister, validateLogin } from "../middleware/validateMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { verifyEmailController } from "../controllers/authController.js";
import { resendVerification } from "../controllers/authController.js";


const router = express.Router();

                //req > middleware > routeHandler 
router.post("/register", validateRegister, register); 
router.post("/login", validateLogin, login );
router.post("/logout", authMiddleware, logout);
router.post("/refresh", refreshAccessToken);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);

router.post("/verify-email", verifyEmailController);
router.post("/resend-verification", resendVerification);

export default router;