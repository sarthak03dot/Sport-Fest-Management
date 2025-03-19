const asyncHandler = require("express-async-handler");
const Match = require("../models/Match");
const Team = require("../models/Team");

// @desc Get leaderboard
// @route GET /api/leaderboard
const getLeaderboard = asyncHandler(async (req, res) => {
    const teams = await Team.find();

    let leaderboard = teams.map((team) => ({
        team: team.name,
        matchesPlayed: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        points: 0,
    }));

    const matches = await Match.find();
    
    matches.forEach((match) => {
        const team1 = leaderboard.find((t) => t.team === match.team1.name);
        const team2 = leaderboard.find((t) => t.team === match.team2.name);

        if (team1 && team2) {
            team1.matchesPlayed += 1;
            team2.matchesPlayed += 1;

            if (match.winner) {
                if (match.winner.toString() === match.team1.toString()) {
                    team1.wins += 1;
                    team1.points += 3;
                    team2.losses += 1;
                } else {
                    team2.wins += 1;
                    team2.points += 3;
                    team1.losses += 1;
                }
            } else {
                team1.draws += 1;
                team2.draws += 1;
                team1.points += 1;
                team2.points += 1;
            }
        }
    });

    leaderboard.sort((a, b) => b.points - a.points);
    res.json(leaderboard);
});

module.exports = { getLeaderboard };
