// backend/routes/adminRoutes.js
import express from "express";
import {
  getDashboard,
  manageUser,
  manageIPAsset,
} from "../controllers/adminController.js";

const router = express.Router();

// GET /admin/dashboard -> retrieve admin dashboard data
router.get("/dashboard", getDashboard);

// PUT /admin/user/:id -> update/manage a user (dummy example)
router.put("/user/:id", manageUser);

// PUT /admin/ip-asset/:id -> update/manage an IP asset (dummy example)
router.put("/ip-asset/:id", manageIPAsset);

export default router;
