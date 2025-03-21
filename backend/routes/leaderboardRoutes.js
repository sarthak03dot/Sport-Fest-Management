// const express = require("express");
// const { getLeaderboard } = require("../controllers/leaderboardController");
// const Match = require("../models/Match");
// const Team = require("../models/Team");
// const router = express.Router();

// router.route("/").get(getLeaderboard);
// // Get leaderboard based on total points
// router.get("/", async (req, res) => {
//   try {
//     const teams = await Team.find();
//     const leaderboard = [];

//     for (const team of teams) {
//       const matchesWon = await Match.countDocuments({ winner: team.name });
//       const matchesPlayed = await Match.countDocuments({
//         $or: [{ teamA: team.name }, { teamB: team.name }],
//       });

//       leaderboard.push({
//         team: team.name,
//         matchesPlayed,
//         matchesWon,
//         points: matchesWon * 3, // 3 points for a win
//       });
//     }

//     leaderboard.sort((a, b) => b.points - a.points);
//     res.json(leaderboard);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching leaderboard" });
//   }
// });
// module.exports = router;



const express = require("express");
const { getLeaderboard } = require("../controllers/leaderboardController");
const Match = require("../models/Match");
const Team = require("../models/Team");
const router = express.Router();

router.route("/").get(getLeaderboard);
// Get leaderboard based on total points
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find();
    const leaderboard = [];

    for (const team of teams) {
      const matchesWon = await Match.countDocuments({ winner: team.name });
      const matchesPlayed = await Match.countDocuments({
        $or: [{ teamA: team.name }, { teamB: team.name }],
      });

      leaderboard.push({
        team: team.name,
        matchesPlayed,
        matchesWon,
        points: matchesWon * 3, // 3 points for a win
      });
    }

    leaderboard.sort((a, b) => b.points - a.points);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
});
module.exports = router;
