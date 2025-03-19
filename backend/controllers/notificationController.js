const asyncHandler = require("express-async-handler");
const Notification = require("../models/Notification");

// @desc Send notification to a user
// @route POST /api/notifications
const sendNotification = asyncHandler(async (req, res) => {
    const { userId, message } = req.body;

    const notification = new Notification({ user: userId, message });
    await notification.save();

    res.status(201).json({ message: "Notification sent successfully" });
});

// @desc Get notifications for logged-in user
// @route GET /api/notifications
const getUserNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(notifications);
});

// @desc Mark notification as read
// @route PUT /api/notifications/:id
const markAsRead = asyncHandler(async (req, res) => {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
        res.status(404);
        throw new Error("Notification not found");
    }

    notification.isRead = true;
    await notification.save();
    
    res.json({ message: "Notification marked as read" });
});

module.exports = { sendNotification, getUserNotifications, markAsRead };
