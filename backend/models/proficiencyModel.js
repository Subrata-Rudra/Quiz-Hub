const mongoose = require("mongoose");

const proficiencySchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    language_id: { type: String, required: true },
    proficiencyLevel: { type: String, required: true, default: "Apprentice" },
  },
  { timestamps: true }
);

const Proficiency = mongoose.model("Proficiency", proficiencySchema);
module.exports = Proficiency;
