import express from "express";
import Asset from "../models/Asset.js";
import { formatUnits } from "ethers";
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

  console.log("Received data:", { assetID, title, description }); // Log the received data

  try {
    const newAsset = new Asset({
      assetID,
      title,
      description,
      aiValuation: null,
    }); // Initialize aiValuation to null
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

// PUT /api/assets/:assetID - Update aiValuation for an asset
// router.put("/:assetID", async (req, res) => {
//   const { assetID } = req.params;
//   const { aiValuation } = req.body;

//   console.log("Received update request:", { assetID, aiValuation }); // Log the received data

//   try {
//     // Validate the aiValuation field
//     if (aiValuation === undefined || aiValuation === null) {
//       return res.status(400).json({ error: "Missing aiValuation field." });
//     }

//     // Update the asset in the database
//     const result = await Asset.updateOne(
//       { assetID },
//       { $set: { aiValuation } }
//     );

//     console.log("Database update result:", result); // Log the update result

//     if (result.matchedCount === 0) {
//       return res.status(404).json({ error: "Asset not found." });
//     }

//     res.status(200).json({ message: "Asset updated successfully!" });
//   } catch (error) {
//     console.error("Error updating asset:", error); // Log the error
//     res.status(500).json({ error: "Failed to update asset." });
//   }
// });

// PUT /api/assets/:assetID - Update aiValuation for an asset
router.put("/:assetID", async (req, res) => {
  const { assetID } = req.params;
  const { aiValuation } = req.body;

  console.log("Received update request:", { assetID, aiValuation }); // Log the received data

  try {
    // Validate the aiValuation field
    if (aiValuation === undefined || aiValuation === null) {
      return res.status(400).json({ error: "Missing aiValuation field." });
    }

    // Define the ETH to USD conversion rate
    const ETH_PRICE_USD = 1600; // Example: 1 Ether = $1600

    // Convert aiValuation from Ether to USD
    const aiValuationInETH = parseFloat(aiValuation) / ETH_PRICE_USD;
    console.log("Converted aiValuation to USD:", aiValuationInETH); // Log the converted value

    // Update the asset in the database
    const result = await Asset.updateOne(
      { assetID },
      { $set: { aiValuation: aiValuationInETH } }
    );

    console.log("Database update result:", result); // Log the update result

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Asset not found." });
    }

    res.status(200).json({ message: "Asset updated successfully!" });
  } catch (error) {
    console.error("Error updating asset:", error); // Log the error
    res.status(500).json({ error: "Failed to update asset." });
  }
});

export default router;
