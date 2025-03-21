// const asyncHandler = require("express-async-handler");
// const Team = require("../models/Team");
// const Event = require("../models/Event");
// const User = require("../models/User");

// // @desc Create a new team
// //   POST /api/teams
// const createTeam = asyncHandler(async (req, res) => {
//     const { name, eventId, maxPlayers } = req.body;
    
//     const event = await Event.findById(eventId);
//     if (!event) {
//         res.status(404);
//         throw new Error("Event not found");
//     }

//     const existingTeam = await Team.findOne({ name });
//     if (existingTeam) {
//         res.status(400);
//         throw new Error("Team name already exists");
//     }

//     const team = new Team({
//         name,
//         event: eventId,
//         captain: req.user._id,
//         maxPlayers,
//         players: [req.user._id],
//     });

//     const createdTeam = await team.save();
//     res.status(201).json(createdTeam);
// });

// // @desc Get all teams
// //   GET /api/teams
// const getTeams = asyncHandler(async (req, res) => {
//     const teams = await Team.find().populate("event", "name").populate("captain", "name");
//     res.json(teams);
// });

// // @desc Get a single team by ID
// //   GET /api/teams/:id
// const getTeamById = asyncHandler(async (req, res) => {
//     const team = await Team.findById(req.params.id).populate("players", "name email").populate("captain", "name email");
    
//     if (team) {
//         res.json(team);
//     } else {
//         res.status(404);
//         throw new Error("Team not found");
//     }
// });

// // @desc Join a team
// //   POST /api/teams/:id/join
// const joinTeam = asyncHandler(async (req, res) => {
//     const team = await Team.findById(req.params.id);

//     if (!team) {
//         res.status(404);
//         throw new Error("Team not found");
//     }

//     if (team.players.includes(req.user._id)) {
//         res.status(400);
//         throw new Error("You are already in this team");
//     }

//     if (team.players.length >= team.maxPlayers) {
//         res.status(400);
//         throw new Error("Team is already full");
//     }

//     team.players.push(req.user._id);
//     await team.save();
    
//     res.json({ message: "You have successfully joined the team", team });
// });

// // @desc Delete a team (Only captain or admin)
// //   DELETE /api/teams/:id
// const deleteTeam = asyncHandler(async (req, res) => {
//     const team = await Team.findById(req.params.id);

//     if (!team) {
//         res.status(404);
//         throw new Error("Team not found");
//     }

//     if (team.captain.toString() !== req.user._id.toString() && req.user.role !== "admin") {
//         res.status(403);
//         throw new Error("Not authorized to delete this team");
//     }

//     await team.remove();
//     res.json({ message: "Team deleted successfully" });
// });

// module.exports = { createTeam, getTeams, getTeamById, joinTeam, deleteTeam };


const asyncHandler = require("express-async-handler");
const Team = require("../models/Team");
const Event = require("../models/Event");
const User = require("../models/User");

// @desc Create a new team
// @route POST /api/teams
// @access Private (Authenticated users)
const createTeam = asyncHandler(async (req, res) => {
    const { name, eventId, maxPlayers } = req.body;

    // Validate required fields
    if (!name || !eventId || !maxPlayers) {
        res.status(400);
        throw new Error("All fields are required");
    }

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
        res.status(404);
        throw new Error("Event not found");
    }

    // Check if team name is already taken
    const existingTeam = await Team.findOne({ name });
    if (existingTeam) {
        res.status(400);
        throw new Error("Team name already exists");
    }

    // Create new team
    // const team = await Team.create({
    //     name,
    //     event: eventId,
    //     captain: req.user._id,
    //     maxPlayers,
    //     players: [req.user._id],
    // });

    if (team) {
        res.status(201).json({
            message: "Team created successfully",
            team,
        });
    } else {
        res.status(500);
        throw new Error("Failed to create team");
    }
});

// @desc Get all teams
// @route GET /api/teams
// @access Public
const getTeams = asyncHandler(async (req, res) => {
    const teams = await Team.find()
        .populate("event", "name")
        .populate("captain", "name email");

    res.status(200).json(teams);
});

// @desc Get a single team by ID
// @route GET /api/teams/:id
// @access Public
const getTeamById = asyncHandler(async (req, res) => {
    const team = await Team.findById(req.params.id)
        .populate("players", "name email")
        .populate("captain", "name email");

    if (!team) {
        res.status(404);
        throw new Error("Team not found");
    }

    res.status(200).json(team);
});

// @desc Join a team
// @route POST /api/teams/:id/join
// @access Private (Authenticated users)
const joinTeam = asyncHandler(async (req, res) => {
    const team = await Team.findById(req.params.id);

    if (!team) {
        res.status(404);
        throw new Error("Team not found");
    }

    // Check if user is already in the team
    if (team.players.includes(req.user._id)) {
        res.status(400);
        throw new Error("You are already in this team");
    }

    // Check if the team has reached max players
    if (team.players.length >= team.maxPlayers) {
        res.status(400);
        throw new Error("Team is already full");
    }

    // Add user to the team
    team.players.push(req.user._id);
    await team.save();

    res.status(200).json({ message: "Successfully joined the team", team });
});

// @desc Delete a team (Only captain or admin can delete)
// @route DELETE /api/teams/:id
// @access Private (Captain or Admin only)
const deleteTeam = asyncHandler(async (req, res) => {
    const team = await Team.findById(req.params.id);

    if (!team) {
        res.status(404);
        throw new Error("Team not found");
    }

    // Check if user is the captain or an admin
    if (team.captain.toString() !== req.user._id.toString() && req.user.role !== "admin") {
        res.status(403);
        throw new Error("Not authorized to delete this team");
    }

    await team.deleteOne();

    res.status(200).json({ message: "Team deleted successfully" });
});

module.exports = { createTeam, getTeams, getTeamById, joinTeam, deleteTeam };
