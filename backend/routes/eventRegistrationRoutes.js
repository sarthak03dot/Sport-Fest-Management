// const express = require("express");
// const { registerForEvent, getEventRegistrations } = require("../controllers/eventRegistrationController");
// const { protect, admin } = require("../middleware/authMiddleware");

// const router = express.Router();

// router.route("/").post(protect, registerForEvent);
// router.route("/:eventId").get(protect, admin, getEventRegistrations);

// module.exports = router;



const express = require("express");
const { registerForEvent, getEventRegistrations } = require("../controllers/eventRegistrationController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(registerForEvent);
router.route("/:eventId").get( getEventRegistrations);

module.exports = router;
