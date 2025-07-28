const User = require("../models/User")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });  // ❗ fix this return
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);  // ✅ fix spelling

    const newUser = new User({ name, email: normalizedEmail, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      user: { _id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login request:", email);
    const user = await User.findOne({ email: req.body.email.toLowerCase().trim() });
    console.log("Found user:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "supersecretkey123",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,  // ✅ Return token
      user: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signupUser, loginUser };