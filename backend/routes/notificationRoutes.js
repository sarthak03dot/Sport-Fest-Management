// const express = require("express");
// const { sendNotification, getUserNotifications, markAsRead } = require("../controllers/notificationController");
// const { protect, admin } = require("../middleware/authMiddleware");

// const router = express.Router();

// router.route("/").post(protect, admin, sendNotification).get(protect, getUserNotifications);
// router.route("/:id").put(protect, markAsRead);

// module.exports = router;


const express = require("express");
const { sendNotification, getUserNotifications, markAsRead } = require("../controllers/notificationController");
// const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post( sendNotification).get( getUserNotifications);
router.route("/:id").put( markAsRead);

module.exports = router;
