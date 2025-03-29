// backend/models/License.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const LicenseSchema = new Schema(
  {
    ipAsset: {
      type: Schema.Types.ObjectId,
      ref: "IPAsset",
      required: true,
    }, // Reference to the IP asset being licensed
    licensee: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // User who holds the license
    terms: { type: String, required: true }, // License terms and conditions
    royaltyPercentage: { type: Number, default: 0 }, // Optional royalty fee
    startDate: { type: Date, default: Date.now }, // Start date of the license
    endDate: { type: Date }, // End date (if applicable)
  },
  { timestamps: true }
);

export default model("License", LicenseSchema);
