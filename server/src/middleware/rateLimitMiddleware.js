import rateLimit from "express-rate-limit";

/**
 * Factory function
 * Creates reusable rate limiters.
 */
const createLimiter = ({ windowMs, max, message, }) => {
  return rateLimit({
    windowMs,
    max,

    standardHeaders: true,
    legacyHeaders: false,

    message: {
      success: false,
      message,
    },
  });
};

/* Login,Prevent brute-force attacks */
export const loginLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts. Please try again after 15 minutes.",
});

/*Register, Prevent fake account creation */
export const registerLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Too many registration attempts. Please try again after 1 hour.",
});

/*Forgot Password*/
export const forgotPasswordLimiter = createLimiter({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: "Too many password reset requests. Please try again after 1 hour.",
});

/*Verify Email */
export const verifyEmailLimiter = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many verification attempts. Please request a new code after 15 minutes.",
});

/*Resend Verification Code */
export const resendVerificationLimiter = createLimiter({
  windowMs: 3 * 60 * 1000,
  max: 1,
  message: "Please wait before requesting another verification code.",
});