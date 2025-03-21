const express = require("express");
const Match = require("../models/Match");
const router = express.Router();

// Update match score
router.post("/update-score", async (req, res) => {
    const { matchId, teamAScore, teamBScore } = req.body;

    try {
        const match = await Match.findById(matchId);
        if (!match) return res.status(404).json({ message: "Match not found" });

        match.teamAScore = teamAScore;
        match.teamBScore = teamBScore;
        await match.save();

        res.json({ message: "Score updated successfully", match });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
