const asyncHandler = require("express-async-handler");
const Event = require("../models/Event");

// @route POST /api/events
const createEvent = asyncHandler(async (req, res) => {
    const { name, description, date, location, maxParticipants } = req.body;

    const event = new Event({
        name,
        description,
        date,
        location,
        maxParticipants,
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
});

// @route GET /api/events
const getEvents = asyncHandler(async (req, res) => {
    const events = await Event.find();
    res.json(events);
});

// @route GET /api/events/:id
const getEventById = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (event) {
        res.json(event);
    } else {
        res.status(404);
        throw new Error("Event not found");
    }
});

// @route PUT /api/events/:id
const updateEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (event) {
        event.name = req.body.name || event.name;
        event.description = req.body.description || event.description;
        event.date = req.body.date || event.date;
        event.location = req.body.location || event.location;
        event.maxParticipants = req.body.maxParticipants || event.maxParticipants;

        const updatedEvent = await event.save();
        res.json(updatedEvent);
    } else {
        res.status(404);
        throw new Error("Event not found");
    }
});

// @route DELETE /api/events/:id
const deleteEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);

    if (event) {
        await event.remove();
        res.json({ message: "Event removed" });
    } else {
        res.status(404);
        throw new Error("Event not found");
    }
});

module.exports = { createEvent, getEvents, getEventById, updateEvent, deleteEvent };
