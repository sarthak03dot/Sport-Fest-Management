const mongoose = require("mongoose");

const teamSchema = mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
        captain: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        players: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        maxPlayers: { type: Number, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);
