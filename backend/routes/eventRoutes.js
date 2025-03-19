const express = require("express");
const { createEvent, getEvents, getEventById, updateEvent, deleteEvent } = require("../controllers/eventController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, admin, createEvent).get(getEvents);
router.route("/:id").get(getEventById).put(protect, admin, updateEvent).delete(protect, admin, deleteEvent);

module.exports = router;
