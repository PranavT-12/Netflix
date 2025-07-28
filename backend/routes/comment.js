const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
    addComment,
    getComment,
    deleteComment
} = require("../controllers/commentController");

router.post("/:movieId", verifyToken, addComment);
router.get("/:movieId", getComment);
router.delete("/:movieId/:id", verifyToken, deleteComment);

module.exports = router;