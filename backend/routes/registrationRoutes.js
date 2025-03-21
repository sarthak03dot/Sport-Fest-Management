const express = require("express");
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const { sendConfirmationEmail } = require("../utils/emailService");
const router = express.Router();
// Get all registrations for the logged-in user
router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find({
      studentEmail: req.user.email,
    }).populate("eventId");
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
// Register for an event
router.post("/register", async (req, res) => {
  const { studentName, studentEmail, eventId, teamId } = req.body;

  try {
    const existingRegistration = await Registration.findOne({
      studentEmail,
      eventId,
    });
    if (existingRegistration)
      return res
        .status(400)
        .json({ message: "You have already registered for this event" });

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const newRegistration = new Registration({
      studentName,
      studentEmail,
      eventId,
      teamId,
    });
    await newRegistration.save();

    // Send Confirmation Email
    sendConfirmationEmail(studentEmail, studentName, event.name);

    res
      .status(201)
      .json({ message: "Registration successful, confirmation email sent" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
