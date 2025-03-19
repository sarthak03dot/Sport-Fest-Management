const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:{ type: String, enum: ["Admin", "Player"], default: "Admin" },
});

module.exports = mongoose.model("Admin", AdminSchema);
