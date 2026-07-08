import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../api/authApi";
import { NAME_REGEX, EMAIL_REGEX, PASSWORD_REGEX} from "../utils/validators";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm({
    mode: "onChange", // 🔥 REAL TIME VALIDATION
  });

  const [message, setMessage] = useState("");
  const password = watch("password");

  // -------------------------
  // SUBMIT
  // -------------------------
  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data);
      setMessage(res.data.message);
      reset();

      setTimeout(() => {
        navigate("/verify-email", {
          state: {
            email: res.data.data.email,
          },
        });
      }, 1000);

    } catch (err) {
      setMessage( err.response?.data?.message || "Something went wrong" );
    }
  };

  

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="auth-container">
      <h2>Register</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* NAME */}
        <input placeholder="Full Name"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Min 3 characters required",
            },
            pattern: {
              value: NAME_REGEX,
              message: "Only letters & spaces allowed",
            },
          })}
          className={
            touchedFields.name
              ? errors.name
                ? "input-error"
                : "input-success"
              : ""
          }
        />
        {errors.name && (
          <span className="error">{errors.name.message}</span>
        )}

        {/* EMAIL */}
        <input placeholder="Email"
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
          <span className="error">{errors.email.message}</span>
        )}

        {/* PASSWORD */}
        <input type="password" placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Minimum 8 characters",
            },
            pattern: {
              value: PASSWORD_REGEX,
              message:
                "Must include upper, lower, number & special char",
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
        <input type="password" placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Confirm your password",
            validate: (value) =>
              value === password || "Passwords do not match",
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
          <span className="error">
            {errors.confirmPassword.message}
          </span>
        )}

        {/* BUTTON */}
        <button disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>


      <p className="auth-link">
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Register;