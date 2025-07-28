const express = require("express");
const router = express.Router();
const { signupUser, loginUser } = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/protected", verifyToken, (req, res) => {
    res.json({ message: "You accessed a protected route!", user: req.user });
});

router.post("/signup", signupUser);
router.post("/login", loginUser);

module.exports = router;
