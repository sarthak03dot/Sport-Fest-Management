const asyncHandler = require("express-async-handler");
const EventRegistration = require("../models/EventRegistration");
const Event = require("../models/Event");

// @desc Register for an event
// @route POST /api/event-registrations
const registerForEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
        res.status(404);
        throw new Error("Event not found");
    }

    const existingRegistration = await EventRegistration.findOne({ event: eventId, user: req.user._id });
    if (existingRegistration) {
        res.status(400);
        throw new Error("Already registered for this event");
    }

    const registration = new EventRegistration({ event: eventId, user: req.user._id });
    await registration.save();

    res.status(201).json({ message: "Successfully registered for event" });
});

// @desc Get all registrations for an event
// @route GET /api/event-registrations/:eventId
const getEventRegistrations = asyncHandler(async (req, res) => {
    const registrations = await EventRegistration.find({ event: req.params.eventId }).populate("user", "name email");
    res.json(registrations);
});

module.exports = { registerForEvent, getEventRegistrations };
