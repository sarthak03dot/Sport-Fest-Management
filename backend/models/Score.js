const mongoose = require("mongoose");

const ScoreboardSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  score: { type: Number, required: true, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Scoreboard", ScoreboardSchema);
