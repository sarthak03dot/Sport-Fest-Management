const asyncHandler = require("express-async-handler");
const Match = require("../models/Match");
const Event = require("../models/Event");
const Team = require("../models/Team");

// @desc Schedule a match
//   POST /api/matches
const scheduleMatch = asyncHandler(async (req, res) => {
    const { eventId, team1Id, team2Id, date, location } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
        res.status(404);
        throw new Error("Event not found");
    }

    const team1 = await Team.findById(team1Id);
    const team2 = await Team.findById(team2Id);

    if (!team1 || !team2) {
        res.status(404);
        throw new Error("One or both teams not found");
    }

    if (team1.event.toString() !== eventId || team2.event.toString() !== eventId) {
        res.status(400);
        throw new Error("Teams must belong to the specified event");
    }

    const match = new Match({
        event: eventId,
        team1: team1Id,
        team2: team2Id,
        date,
        location,
    });

    await match.save();
    res.status(201).json(match);
});

// @desc Get all matches
//   GET /api/matches
const getMatches = asyncHandler(async (req, res) => {
    const matches = await Match.find().populate("event", "name").populate("team1 team2", "name");
    res.json(matches);
});

// @desc Declare match winner
//   PUT /api/matches/:id
const declareWinner = asyncHandler(async (req, res) => {
    const match = await Match.findById(req.params.id);

    if (!match) {
        res.status(404);
        throw new Error("Match not found");
    }

    const { winnerId } = req.body;

    if (winnerId !== match.team1.toString() && winnerId !== match.team2.toString()) {
        res.status(400);
        throw new Error("Winner must be one of the participating teams");
    }

    match.winner = winnerId;
    await match.save();
    
    res.json({ message: "Winner declared successfully", match });
});

module.exports = { scheduleMatch, getMatches, declareWinner };
