import express from "express";
import Asset from "../models/Asset.js";

const router = express.Router();

// POST /api/assets - Store asset data
// router.post("/", async (req, res) => {
//   const { assetID, title, description } = req.body;

//   try {
//     const newAsset = new Asset({ assetID, title, description });
//     await newAsset.save();
//     res.status(201).json({ message: "Asset stored successfully!" });
//   } catch (error) {
//     console.error("Error storing asset:", error);
//     res.status(500).json({ error: "Failed to store asset." });
//   }
// });

router.post("/", async (req, res) => {
  const { assetID, title, description } = req.body;

  console.log("Received data:", { assetID, title, description , aiValuation}); // Log the received data

  try {
    const newAsset = new Asset({ assetID, title, description ,aiValuation}); // Initialize aiValuation to null
    await newAsset.save();
    console.log("Asset stored successfully in MongoDB."); // Log success
    res.status(201).json({ message: "Asset stored successfully!" });
  } catch (error) {
    console.error("Error storing asset in MongoDB:", error); // Log the error
    res.status(500).json({ error: "Failed to store asset." });
  }
});

// GET /api/assets/:assetID - Retrieve asset data
router.get("/:assetID", async (req, res) => {
  const { assetID } = req.params;

  try {
    const asset = await Asset.findOne({ assetID });
    if (!asset) {
      return res.status(404).json({ error: "Asset not found." });
    }
    res.status(200).json(asset);
  } catch (error) {
    console.error("Error retrieving asset:", error);
    res.status(500).json({ error: "Failed to retrieve asset." });
  }
});

export default router;
