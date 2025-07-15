import mongoose from "mongoose";

// Define the schema for ClaimHistory
const ClaimHistorySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    points: {
      type: Number,
    },
    claimedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create the ClaimHistory model from the schema
let ClaimHistory = mongoose.model("ClaimHistory", ClaimHistorySchema);

// Export the model for use in other parts of the app
export default ClaimHistory;
