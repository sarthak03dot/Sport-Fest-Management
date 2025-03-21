// const express = require("express");
// const router = express.Router();
// const Scoreboard = require("../models/Score");
// const authMiddleware = require("../middleware/authMiddleware");

// router.get("/", async (req, res) => {
//   try {
//     const scoreboards = await Scoreboard.find().populate("event team");
//     res.status(200).json(scoreboards);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch scoreboards." });
//   }
// });

// router.post("/", authMiddleware, async (req, res) => {
//   try {
//     const { event, team, score } = req.body;

//     const newScore = new Scoreboard({
//       event,
//       team,
//       score
//     });

//     await newScore.save();
//     res.status(201).json({ message: "Scoreboard entry added!", newScore });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to add scoreboard entry." });
//   }
// });

// router.put("/:id", authMiddleware, async (req, res) => {
//   try {
//     const { score } = req.body;
//     const updatedScore = await Scoreboard.findByIdAndUpdate(
//       req.params.id,
//       { score },
//       { new: true }
//     );

//     if (!updatedScore) return res.status(404).json({ error: "Scoreboard entry not found." });

//     res.status(200).json({ message: "Score updated successfully!", updatedScore });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update score." });
//   }
// });

// router.delete("/:id", authMiddleware, async (req, res) => {
//   try {
//     const deletedScore = await Scoreboard.findByIdAndDelete(req.params.id);
//     if (!deletedScore) return res.status(404).json({ error: "Scoreboard entry not found." });

//     res.status(200).json({ message: "Scoreboard entry deleted." });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete scoreboard entry." });
//   }
// });

// module.exports = router;




const express = require("express");
const router = express.Router();
const Scoreboard = require("../models/Score");
// const authMiddleware = require("../middleware/authMiddleware");

router.get("/", async (req, res) => {
  try {
    const scoreboards = await Scoreboard.find().populate("event team");
    res.status(200).json(scoreboards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch scoreboards." });
  }
});

router.post("/",  async (req, res) => {
  try {
    const { event, team, score } = req.body;

    const newScore = new Scoreboard({
      event,
      team,
      score
    });

    await newScore.save();
    res.status(201).json({ message: "Scoreboard entry added!", newScore });
  } catch (error) {
    res.status(500).json({ error: "Failed to add scoreboard entry." });
  }
});

router.put("/:id",  async (req, res) => {
  try {
    const { score } = req.body;
    const updatedScore = await Scoreboard.findByIdAndUpdate(
      req.params.id,
      { score },
      { new: true }
    );

    if (!updatedScore) return res.status(404).json({ error: "Scoreboard entry not found." });

    res.status(200).json({ message: "Score updated successfully!", updatedScore });
  } catch (error) {
    res.status(500).json({ error: "Failed to update score." });
  }
});

router.delete("/:id",  async (req, res) => {
  try {
    const deletedScore = await Scoreboard.findByIdAndDelete(req.params.id);
    if (!deletedScore) return res.status(404).json({ error: "Scoreboard entry not found." });

    res.status(200).json({ message: "Scoreboard entry deleted." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete scoreboard entry." });
  }
});

module.exports = router;
