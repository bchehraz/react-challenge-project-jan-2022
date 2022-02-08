const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const router = express.Router();

// login expects email/password
// successful login returns email and a fake token (if we ever want to use it)
router.post("/login", (req, res) => {
  try {
    if (!req.body || !req.body.email || !req.body.password) {
      res.status(401).json({ success: false, error: "Bad login information" });
      return;
    }
    res
      .status(200)
      .json({ success: true, email: req.body.email, token: "12345luggage" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Unknown error" });
  }
});

// register: expects email, password, and confirmPassword
// successful register returns a 200 status code
router.post("/register", async (req, res) => {
  try {
    if (
      !req.body ||
      !req.body.email ||
      !req.body.password ||
      !req.body.confirmPassword
    ) {
      res.status(400).json({ success: false, error: "Invalid Register Input" });
      return;
    }

    req.body.email = req.body.email.toLowerCase();

    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      res.status(400).json({ success: false, error: "Passwords do not match" });
    }

    // Verify email is using valid format
    const emailRegex =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(emailRegex)) {
      res.status(400).json({ success: false, error: "Invalid Email Input" });
      return;
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res
        .status(400)
        .json({ success: false, error: "Email is already signed up" });
      return;
    }

    // If all input is valid, commence registration.

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(200).json({ success: true }); // register success
    return;
  } catch (error) {
    res.status(500).json({ success: false, error: "Unknown error" });
  }
});

module.exports = router;
