const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true, unique: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: false }
});

module.exports = mongoose.model("Registration", RegistrationSchema);
