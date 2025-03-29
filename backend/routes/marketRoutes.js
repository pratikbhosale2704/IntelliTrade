// backend/routes/marketRoutes.js
import express from "express";
import {
  listMarketItems,
  getMarketItem,
} from "../controllers/marketController.js";

const router = express.Router();

// GET /market -> list all marketplace items
router.get("/", listMarketItems);

// GET /market/:id -> get details of a specific marketplace item
router.get("/:id", getMarketItem);

export default router;
