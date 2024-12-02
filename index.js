import express from "express";
import 'dotenv/config';
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./router/user.Router.js"; // User-specific routes
import captainRouter from "./router/captain.Router.js"; // Captain-specific routes
import { connectDatabase } from "./config/db.js";

// Database connection
connectDatabase();

const PORT = process.env.PORT || 5000; // Use a default port if process.env.PORT is undefined

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use("/api/auth", userRouter); // User routes
app.use("/api/captain", captainRouter); // Captain routes

// Fallback route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
