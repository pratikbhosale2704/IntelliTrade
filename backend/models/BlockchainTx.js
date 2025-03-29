const blockchainTxSchema = new mongoose.Schema({
  txHash: {
    type: String,
    required: true,
    unique: true,
  },
  blockNumber: {
    type: Number,
    required: true,
  },
  fromAddress: String,
  toAddress: String,
  contractAddress: String,
  gasUsed: Number,
  timestamp: Date,
  eventType: {
    type: String,
    enum: ["registration", "transfer", "license", "royalty"],
  },
  relatedDocument: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "relatedDocumentModel",
  },
  relatedDocumentModel: {
    type: String,
    enum: ["IPAsset", "Transaction", "License"],
  },
});

module.exports = mongoose.model("BlockchainTx", blockchainTxSchema);
