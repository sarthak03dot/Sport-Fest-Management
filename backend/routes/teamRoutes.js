// const express = require("express");
// const { createTeam, getTeams, getTeamById, joinTeam, deleteTeam } = require("../controllers/teamController");
// const { protect, admin } = require("../middleware/authMiddleware");

// const router = express.Router();

// router.route("/").post(protect, createTeam).get(getTeams);
// router.route("/:id").get(getTeamById).delete(protect, deleteTeam);
// router.route("/:id/join").post(protect, joinTeam);

// module.exports = router;



const express = require("express");
const { createTeam, getTeams, getTeamById, joinTeam, deleteTeam } = require("../controllers/teamController");
// const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/")
    .post( createTeam)
    .get(getTeams);
router.route("/:id")
    .get(getTeamById)
    .delete( deleteTeam);
router.route("/:id/join").post( joinTeam);

module.exports = router;
