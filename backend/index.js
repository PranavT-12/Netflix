require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const commentRoutes = require("./routes/comment");
const favouriteRoutes = require("./routes/favourite");


const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middlewares
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://netflix-wlhz.vercel.app",],

    methods: ["GET", "POST", "DELETE"],
    credentials: true,
}));
app.use(express.json());


// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/favourite", favouriteRoutes);



// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/netflix")
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.log("❌ MongoDB connection error:", err));

// ✅ Root Route
app.get("/", (req, res) => {
    res.send("✅ Backend is working");
});

// ✅ Server Listening
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});