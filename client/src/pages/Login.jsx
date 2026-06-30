import { useForm } from "react-hook-form";
import { loginUser } from "../api/authApi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EMAIL_REGEX, PASSWORD_REGEX} from "../utils/validators";
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
  const onSubmit = async (data) => {
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
      setMessage(
        err.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* EMAIL */}
        <input
          placeholder="Email"
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

        <button disabled={isSubmitting}>
          {isSubmitting
            ? "Logging in..."
            : "Login"}
        </button>
      </form>

      <p className="auth-link">
        Don't have an account?{" "}
        <Link to="/register">
          Register
        </Link>
      </p>

      {message && (
        <p className="message">{message}</p>
      )}
    </div>
  );
};

export default Login;