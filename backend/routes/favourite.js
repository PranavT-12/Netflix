const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Favourite = require("../models/Favourite");

// ✅ Add to Favourites
router.post("/add", async (req, res) => {
  try {
    const { userId, movie } = req.body;

    if (!userId || !movie) {
      return res.status(400).json({ message: "Missing userId or movie data" });
    }

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const newItem = new Favourite({
      userId: new mongoose.Types.ObjectId(userId),
      movie,
    });

    await newItem.save();
    res.status(201).json({ message: "Added to Favourites" });
  } catch (err) {
    console.error("Error in POST /add:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Get Favourites by userId
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const favourites = await Favourite.find({
      userId: new mongoose.Types.ObjectId(userId),
    });

    res.status(200).json(favourites);
  } catch (err) {
    console.error("Error in GET /:userId:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Delete Favourite by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    await Favourite.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (err) {
    console.error("Error in DELETE /delete/:id:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;