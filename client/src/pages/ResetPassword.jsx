import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { resetPassword } from "../api/authApi";
import { PASSWORD_REGEX } from "../utils/validators";
import "./auth.css";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: {
      errors,
      touchedFields,
      isSubmitting,
    },
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const res = await resetPassword(token, { password: data.password, });

      setMessage(res.data.message);
      reset();

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        "Unable to reset password."
      );
    }
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="New Password"
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: PASSWORD_REGEX,
              message:"Must include 8 characters, uppercase, lowercase, number and special character",
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

        {/* CONFIRM PASSWORD */}

        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          className={
            touchedFields.confirmPassword
              ? errors.confirmPassword
                ? "input-error"
                : "input-success"
              : ""
          }
        />

        {errors.confirmPassword && (
          <span className="error"> {errors.confirmPassword.message} </span>
        )}

        <button disabled={isSubmitting}>
          {isSubmitting
            ? "Resetting..."
            : "Reset Password"}
        </button>

      </form>

      {message && (<p className="message"> {message} </p> )}

      <p className="auth-link">
        <Link to="/login">
          Back to Login
        </Link>
      </p>

    </div>
  );
};

export default ResetPassword;