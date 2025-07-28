const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
    const { movieId } = req.params;
    const { text } = req.body;
    const { userId, email } = req.user;

    try {
        const comment = new Comment({
            movieId,
            text,
            user: { userId, name: email },
        });
        await comment.save();
        res.status(201).json({ message: "Comment added", comment });
    } catch (err) {
        res.status(500).json({ message: "Error adding comment" });
    }
};

exports.getComment = async (req, res) => {
    const { movieId } = req.params;

    try {
        const comments = await Comment.find({ movieId }).sort({ createdAt: -1 });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: "Error fetching comments" });
    }
};

exports.deleteComment = async (req, res) => {
    const { movieId, id } = req.params;
    const { userId } = req.user;

    try {
        const comment = await Comment.findById(id);
        if (!comment) return
        res.status(404).json({ message: "Comment not found" });

        if (comment.user.userId !== userId) {
            return
            res.status(403).json({ message: "Not allowed to delete this comment" });
        }

        await Comment.findByIdAndDelete(id);
        res.status(200).json({ message: "Comment deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting comment" });
    }
};