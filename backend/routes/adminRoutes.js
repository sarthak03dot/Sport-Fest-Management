const express = require("express");
const Registration = require("../models/Registration");
const Match = require("../models/Match");
const { authenticateUser, authorizeAdmin } = require("../middleware/authMiddleware");

const router = express.Router();
router.use(authenticateUser);
router.use(authorizeAdmin);
// Get all event registrations
router.get("/registrations", async (req, res) => {
  try {
    const registrations = await Registration.find().populate("eventId");
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching registrations" });
  }
});

// Approve/Reject a registration
router.put("/registrations/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(registration);
  } catch (error) {
    res.status(500).json({ message: "Error updating registration" });
  }
});

// Update match scores
router.put("/matches/:id", async (req, res) => {
  try {
    const { teamAScore, teamBScore, winner } = req.body;
    const match = await Match.findByIdAndUpdate(
      req.params.id,
      { teamAScore, teamBScore, winner },
      { new: true }
    );
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: "Error updating match score" });
  }
});

module.exports = router;
