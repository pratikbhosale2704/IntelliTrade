// backend/models/Transaction.js
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const TransactionSchema = new Schema(
  {
    ipAsset: {
      type: Schema.Types.ObjectId,
      ref: "IPAsset",
      required: true,
    }, // The IP asset involved in the transaction
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Buyer reference
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Seller reference
    transactionAmount: { type: Number, required: true }, // Transaction value
    transactionDate: { type: Date, default: Date.now }, // Date of transaction
  },
  { timestamps: true }
);

export default model("Transaction", TransactionSchema);
