const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    movieId: {
        type: String,
        required: true,
    },
    user: {
        userId: String,
        name: String,
    },
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Comment", commentSchema);