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