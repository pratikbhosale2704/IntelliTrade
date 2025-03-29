import express from "express";
import {
  getProfile,
  updateProfile,
  deleteAccount,
  getAllUsers,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to get and update the user's profile
router
  .route("/profile")
  .get(protect, getProfile) // Fetch user profile
  .patch(protect, updateProfile); // Update user profile

// Route to delete the user's account
router.delete("/delete", protect, deleteAccount);

// Optional: Route to fetch all users (admin only)
router.get("/users", protect, getAllUsers);

export default router;
