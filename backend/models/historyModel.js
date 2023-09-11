const mongoose = require("mongoose");

const historySchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    language_id: { type: String, required: true },
    score_percent: { type: Number, required: true },
    accuracy: { type: String, required: true },
  },
  { timestamps: true }
);

const History = mongoose.model("History", historySchema);

module.exports = History;
