const mongoose = require("mongoose");

const eventRegistrationSchema = mongoose.Schema(
    {
        event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("EventRegistration", eventRegistrationSchema);
