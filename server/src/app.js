import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// --------------------
// MIDDLEWARE
// --------------------
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // IMPORTANT for cookies
  })
);

app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);


app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(500).json({
    success: false,
    message: "Server Error",
  });
});

export default app;