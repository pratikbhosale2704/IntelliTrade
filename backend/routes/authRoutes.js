// backend/routes/authRoutes.js
import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { check } from "express-validator";
import validate from "../middleware/validate.js";

const router = express.Router();

// POST /auth/register
router.post(
  "/signup",
  [
    check("firstName").notEmpty().withMessage("First name is required"),
    check("lastName").notEmpty().withMessage("Last name is required"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  validate,
  register
);

// POST /auth/login
router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Valid email is required"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  validate,
  login
);

// GET /auth/logout
router.get("/logout", logout);

export default router;
