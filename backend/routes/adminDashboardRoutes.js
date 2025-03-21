// const express = require("express");
// const { getDashboardStats, getAllUsers, getAllEvents, getAllTeams, getAllMatches } = require("../controllers/adminDashboardController");
// const { protect, admin } = require("../middleware/authMiddleware");

// const router = express.Router();

// router.route("/dashboard").get(protect, admin, getDashboardStats);
// router.route("/users").get(protect, admin, getAllUsers);
// router.route("/events").get(protect, admin, getAllEvents);
// router.route("/teams").get(protect, admin, getAllTeams);
// router.route("/matches").get(protect, admin, getAllMatches);

// module.exports = router;



const express = require("express");
const { getDashboardStats, getAllUsers, getAllEvents, getAllTeams, getAllMatches } = require("../controllers/adminDashboardController");
// const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/dashboard").get( getDashboardStats);
router.route("/users").get( getAllUsers);
router.route("/events").get( getAllEvents);
router.route("/teams").get( getAllTeams);
router.route("/matches").get( getAllMatches);

module.exports = router;
