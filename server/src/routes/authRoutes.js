import express from "express";
import { register, login, logout, refreshAccessToken, forgotPasswordController, resetPasswordController} from "../controllers/authController.js";
import { validateRegister, validateLogin } from "../middleware/validateMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { verifyEmailController } from "../controllers/authController.js";
import { resendVerification } from "../controllers/authController.js";

import { loginLimiter, registerLimiter, forgotPasswordLimiter, verifyEmailLimiter, resendVerificationLimiter, } from "../middleware/rateLimitMiddleware.js";


const router = express.Router();

                //req > middleware > routeHandler 
router.post("/register", registerLimiter , validateRegister, register); 
router.post("/login", loginLimiter, validateLogin, login );
router.post("/logout", authMiddleware, logout);
router.post("/refresh", refreshAccessToken);
router.post("/forgot-password", forgotPasswordLimiter, forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);

router.post("/verify-email", verifyEmailLimiter, verifyEmailController);
router.post("/resend-verification", resendVerificationLimiter, resendVerification);

export default router;