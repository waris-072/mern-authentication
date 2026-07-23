export const passwordResetTemplate = (resetURL) => {
  return `
    <h2>Password Reset</h2>

    <p>You requested a password reset.</p>

    <p>
      Click the button below to reset your password.
    </p>

    <a
      href="${resetURL}"
      style="
        display:inline-block;
        padding:12px 18px;
        background:#2563eb;
        color:#ffffff;
        text-decoration:none;
        border-radius:6px;
        font-weight:600;
      "
    >
      Reset Password
    </a>

    <p>
      This link expires in <strong>15 minutes</strong>.
    </p>

    <p>
      If you didn't request this password reset,
      you can safely ignore this email.
    </p>
  `;
};

export const verifyEmailTemplate = (otp) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
      <h2>Email Verification</h2>

      <p>Welcome to MERN Auth.</p>

      <p>
        Use the verification code below to verify your account.
      </p>

      <div
        style="
          font-size:32px;
          font-weight:bold;
          letter-spacing:8px;
          background:#f5f5f5;
          padding:20px;
          text-align:center;
          border-radius:8px;
        "
      >
        ${otp}
      </div>

      <p style="margin-top:20px;">
        This code expires in <strong>15 minutes</strong>.
      </p>

      <p>
        If you didn't create this account, you can safely ignore this email.
      </p>
    </div>
  `;
};

export const suspiciousLoginTemplate = (name) => {
  return `
    <h2>Security Alert</h2>

    <p>Hello ${name},</p>

    <p>
      We detected multiple failed login attempts on your account.
    </p>

    <p>
      Your account has been temporarily locked for
      <strong>10 minutes</strong>.
    </p>

    <p>
      If these attempts were not made by you,
      we recommend resetting your password immediately.
    </p>

    <p>
      If this was you,
      simply wait until the lock expires and try again or click forgot password.
    </p>

    <hr />

    <p>
      MERN Auth Project Security
    </p>
  `;
};