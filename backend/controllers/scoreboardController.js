const asyncHandler = require("express-async-handler");
const Match = require("../models/Match");

// @desc Update match score
// @route PUT /api/scoreboard/:id
const updateMatchScore = asyncHandler(async (req, res) => {
    const { team1Score, team2Score } = req.body;
    const match = await Match.findById(req.params.id);

    if (!match) {
        res.status(404);
        throw new Error("Match not found");
    }

    match.team1Score = team1Score;
    match.team2Score = team2Score;

    // Determine winner
    if (team1Score > team2Score) {
        match.winner = match.team1;
    } else if (team2Score > team1Score) {
        match.winner = match.team2;
    } else {
        match.winner = null; // Draw match
    }

    await match.save();
    res.json({ message: "Score updated successfully", match });
});

// @desc Get match scores
// @route GET /api/scoreboard
const getScoreboard = asyncHandler(async (req, res) => {
    const matches = await Match.find()
        .populate("event", "name")
        .populate("team1 team2 winner", "name");
    res.json(matches);
});

module.exports = { updateMatchScore, getScoreboard };
