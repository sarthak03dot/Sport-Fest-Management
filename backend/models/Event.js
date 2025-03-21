const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        date: { type: Date, required: true },
        location: { type: String, required: true },
        maxParticipants: { type: Number, required: true },
        participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
