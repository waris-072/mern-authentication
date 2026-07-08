import { useEffect, useRef, useState } from "react";
import {
  verifyEmail,
  resendVerification,
} from "../api/authApi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(180);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) {
      navigate("/register");
      return;
    }

    inputRefs.current[0]?.focus();
  }, [email, navigate]);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const minutes = String(
    Math.floor(secondsLeft / 60)
  ).padStart(2, "0");

  const seconds = String(
    secondsLeft % 60
  ).padStart(2, "0");

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOTP = [...otp];
    newOTP[index] = value;

    setOtp(newOTP);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOTP = [...otp];
        newOTP[index] = "";
        setOtp(newOTP);
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .trim();

    if (!/^\d{6}$/.test(pasted)) return;

    const values = pasted.split("");

    setOtp(values);

    inputRefs.current[5]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalOTP = otp.join("");

    if (finalOTP.length !== 6) {
      setMessage("Please enter all 6 digits.");
      return;
    }

    try {
      setLoading(true);

      const res = await verifyEmail({
        email,
        otp: finalOTP,
      });

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          "Verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);

      const res = await resendVerification(email);

      setMessage(res.data.message);

      setOtp(new Array(6).fill(""));

      inputRefs.current[0]?.focus();

      setSecondsLeft(180);
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          "Unable to resend verification code."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="auth-container">

      <div className="verify-header">

        <div className="verify-icon">
          <MdEmail />
        </div>

        <h2>Verify Email</h2>

        <p>
          Enter the verification code sent to
        </p>

        <strong>{email}</strong>

      </div>

      <form onSubmit={handleSubmit}>

        <div
          className="otp-container"
          onPaste={handlePaste}
        >
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) =>
                (inputRefs.current[index] = el)
              }
              className="otp-input"
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) =>
                handleChange(
                  e.target.value,
                  index
                )
              }
              onKeyDown={(e) =>
                handleKeyDown(e, index)
              }
            />
          ))}
        </div>

        <button
          className="verify-btn"
          disabled={loading}
        >
          {loading
            ? "Verifying..."
            : "Verify Email"}
        </button>
      </form>

      <div className="verification-footer">

        <p className="countdown">
          Code expires in

          <span>
            {minutes}:{seconds}
          </span>
        </p>

        <button
          type="button"
          className="resend-btn"
          disabled={
            secondsLeft > 0 || resending
          }
          onClick={handleResend}
        >
          {resending
            ? "Sending..."
            : "Resend Code"}
        </button>

      </div>

      {message && (
        <p className="message">
          {message}
        </p>
      )}

      <p className="auth-link">
        <Link to="/login">
          Back to Login
        </Link>
      </p>

    </div>
  );
};

export default VerifyEmail;