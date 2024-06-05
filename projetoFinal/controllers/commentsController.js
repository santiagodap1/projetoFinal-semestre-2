const Comment = require("../sequelize.js").Comment;

exports.createComment = async (req, res) => {
    try {
        const { user_id, post_id, content } = req.body;
        const comment = await Comment.create({ user_id, post_id, content });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const { comment_id } = req.params;
        const deleted = await Comment.destroy({
            where: { comment_id }
        });
        if (deleted) {
            return res.status(204).send("Comment deleted");
        }
        throw new Error("Comment not found");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};