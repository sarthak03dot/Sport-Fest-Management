const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

router.post("/register", registerUser);
router.post("/login", loginUser);

// Get logged-in user details
router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user details" });
    }
  }
);
// admin login
router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
