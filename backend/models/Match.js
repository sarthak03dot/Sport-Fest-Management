const mongoose = require("mongoose");

const matchSchema = mongoose.Schema(
    {
        event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
        team1: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
        team2: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
        team1Score: { type: Number, default: 0 },
        team2Score: { type: Number, default: 0 },
        date: { type: Date, required: true },
        location: { type: String, required: true },
        winner: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Match", matchSchema);
