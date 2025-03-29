// backend/models/Verification.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const VerificationSchema = new Schema(
  {
    ipAsset: {
      type: Schema.Types.ObjectId,
      ref: "IPAsset",
      required: true,
    }, // The IP asset to verify
    status: {
      type: String,
      enum: ["Verified", "Pending", "Rejected"],
      default: "Pending",
    }, // Verification status
    verifiedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    }, // Optional reference to the user who verified the asset
    verificationDate: { type: Date }, // Date of verification
  },
  { timestamps: true }
);

export default model("Verification", VerificationSchema);
