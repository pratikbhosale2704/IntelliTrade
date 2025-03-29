// backend/server.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Import route modules
import authRoutes from "./routes/authRoutes.js";
// import ipRoutes from "./routes/ipRoutes.js";
import marketRoutes from "./routes/marketRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import assetsRoutes from "./routes/assetsRoutes.js"; // Import the new assets route module

// Destructure PORT and URI from environment variables
const { PORT, URI } = process.env;

// Create an Express application instance
const app = express();

// Apply middlewares
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies in requests
app.use(cookieParser()); // Parse cookies attached to the client request

// Connect to MongoDB using Mongoose
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Database connection error:", err));

// Mount route modules
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
// app.use("/ip-assets", ipRoutes);
app.use("/market", marketRoutes);
app.use("/payment", paymentRoutes);
app.use("/admin", adminRoutes);
app.use("/api/assets", assetsRoutes);
// Define a default route for sanity-check
app.get("/", (req, res) => {
  res.send("Welcome to the Backend API!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
