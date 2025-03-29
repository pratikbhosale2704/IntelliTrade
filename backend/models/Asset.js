import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
  assetID: { type: String, required: true, unique: true }, // Blockchain asset ID
  title: { type: String, required: true },
  description: { type: String, required: true },
  aiValuation: { type: mongoose.Schema.Types.Mixed, default: 'N/A' }, // AI valuation result
  createdAt: { type: Date, default: Date.now },
});

// Export the model correctly
export default mongoose.model("Asset", assetSchema);
