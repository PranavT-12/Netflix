const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers?.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey123"); // fallback key
        req.user = { userId: decoded.userId }; // ✅ correct property

        next();
    } catch (err) {
        console.error("Token verification failed:", err);
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

module.exports = verifyToken;