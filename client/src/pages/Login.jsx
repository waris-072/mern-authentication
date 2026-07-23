import { useForm } from "react-hook-form";
import { loginUser } from "../api/authApi";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EMAIL_REGEX, PASSWORD_REGEX} from "../utils/validators";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import "./auth.css";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
      touchedFields,
    },
  } = useForm({
    mode: "onChange",
  });

  const [message, setMessage] = useState("");
  const [lockUntil, setLockUntil] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  const isLocked = !!lockUntil && timeLeft > 0;
  const minutes = String(
    Math.floor(timeLeft / 60)
  ).padStart(2, "0");

  const seconds = String(
    timeLeft % 60
  ).padStart(2, "0");


  useEffect(() => {
    const savedLockUntil = localStorage.getItem("authLockUntil");

    if (!savedLockUntil) return;

    if (new Date(savedLockUntil).getTime() > Date.now()) {
      setLockUntil(savedLockUntil);
    } else {
      localStorage.removeItem("authLockUntil");
    }
  }, []);

  useEffect(() => {
    if (!lockUntil) return;

    const updateTimer = () => {
      const remaining = Math.max(0, Math.floor(
        (new Date(lockUntil).getTime() - Date.now()) / 1000)
      );

      setTimeLeft(remaining);

      if (remaining <= 0) {
        setLockUntil(null);
        localStorage.removeItem("authLockUntil");
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);

  }, [lockUntil]);

  const onSubmit = async (data) => {
    setMessage("");
    try {
      const res = await loginUser(data);

      setMessage("Login successful");
      reset();

      const role = res.data.user.role;

      console.log(res.data);

      setTimeout(() => {
        if (role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/profile");
        }
      }, 500);

    } catch (err) {
        if (err.response?.data?.verificationRequired) {
          navigate("/verify-email", {
            state: {
              email: err.response.data.email,
            },
          });
          return;
        }
        if (err.response?.data?.locked) {
          setMessage("");
          setLockUntil(err.response.data.lockUntil);
          const lockTime = err.response.data.lockUntil;
          setLockUntil(lockTime);

          localStorage.setItem( "lockUntil", lockTime );
          return;
        }
      setMessage( err.response?.data?.message || "Login failed" );
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* EMAIL */}
        <input
          placeholder="Email"
          disabled={isLocked}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: EMAIL_REGEX,
              message: "Invalid email format",
            },
          })}
          className={
            touchedFields.email
              ? errors.email
                ? "input-error"
                : "input-success"
              : ""
          }
        />

        {errors.email && (
          <span className="error">
            {errors.email.message}
          </span>
        )}

        {/* PASSWORD */}
        <input
          type="password"
          disabled={isLocked}
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: PASSWORD_REGEX,
              message: "Must Include 8 chars, uppercase, lowercase, number, and special char",
            },
          })}
          className={
            touchedFields.password
              ? errors.password
                ? "input-error"
                : "input-success"
              : ""
          }
        />

        {errors.password && (
          <span className="error">
            {errors.password.message}
          </span>
        )}

        <button disabled={isSubmitting || isLocked}>
          {
            isLocked
              ? "Account Locked"
              : isSubmitting
                ? "Logging in..."
                : "Login"
          }
        </button>
      </form>
      {message && (
        <p className="message">{message}</p>
      )}


      {isLocked && (
        <div className="lock-notice">
          <div className="lock-notice-icon">
            🔒
          </div>

          <h3>Account Locked</h3>

          <p>
            Too many unsuccessful login attempts were detected.
          </p>

          <p>
            Please try again in
          </p>

          <div className="lock-countdown">
            {minutes}:{seconds}
          </div>
        </div>
      )}


      <div className="oauth-buttons">
        <button type="button" className="google-btn" onClick={() => {
            window.location.href = "http://localhost:5000/api/auth/google";
          }} disabled={isLocked}
        >
          <FcGoogle size={22} />
        </button>

        <button type="button" className="github-btn" onClick={() => {
            window.location.href = "http://localhost:5000/api/auth/github";
          }} disabled={isLocked}
        >
          <FaGithub size={20} />
        </button>
      </div>

      <p className="auth-link">
        <Link
          to={isLocked ? "#" : "/forgot-password"}
          onClick={(e) => {
            if (isLocked) {
              e.preventDefault();
            }
          }}
          className={isLocked ? "locked-link" : ""}
        >
          Forgot Password?
        </Link>
      </p>

      <p className="auth-link">
        Don't have an account?{" "}
        <Link  
          to={isLocked ? "#" : "/register"}
          onClick={(e) => {
            if (isLocked) e.preventDefault();
          }}
          className={isLocked ? "locked-link" : ""}
        >
          Register
        </Link>
      </p>
      
    </div>
  );
};

export default Login;