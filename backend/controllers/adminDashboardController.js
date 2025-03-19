const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Event = require("../models/Event");
const Team = require("../models/Team");
const Match = require("../models/Match");

// @desc Get dashboard stats
// @route GET /api/admin/dashboard
const getDashboardStats = asyncHandler(async (req, res) => {
    const userCount = await User.countDocuments();
    const eventCount = await Event.countDocuments();
    const teamCount = await Team.countDocuments();
    const matchCount = await Match.countDocuments();

    res.json({ userCount, eventCount, teamCount, matchCount });
});

// @desc Get all users
// @route GET /api/admin/users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");
    res.json(users);
});

// @desc Get all events
// @route GET /api/admin/events
const getAllEvents = asyncHandler(async (req, res) => {
    const events = await Event.find();
    res.json(events);
});

// @desc Get all teams
// @route GET /api/admin/teams
const getAllTeams = asyncHandler(async (req, res) => {
    const teams = await Team.find().populate("event", "name");
    res.json(teams);
});

// @desc Get all matches
// @route GET /api/admin/matches
const getAllMatches = asyncHandler(async (req, res) => {
    const matches = await Match.find()
        .populate("event", "name")
        .populate("team1 team2 winner", "name");
    res.json(matches);
});

module.exports = { getDashboardStats, getAllUsers, getAllEvents, getAllTeams, getAllMatches };
