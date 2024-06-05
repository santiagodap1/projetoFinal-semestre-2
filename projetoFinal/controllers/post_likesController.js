const PostLike = require('../sequelize').PostLike;



exports.likePost = (req, res, next) => {
    const { userId, postId } = req.body;
    PostLike.create({
        user_id: userId,
        post_id: postId
    })
    .then(() => {
        res.status(201).json({ message: 'Like added successfully.' });
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
};


exports.unlikePost = (req, res, next) => {
    const { userId, postId } = req.body;

    PostLike.destroy({
        where: { user_id: userId, post_id: postId }
    })
    .then(() => {
        res.status(200).json({ message: 'Like removed successfully.' });
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
};


exports.hasLikedPost = (req, res, next) => {
    const { userId, postId } = req.body;

    PostLike.findOne({
        where: { user_id: userId, post_id: postId }
    })
    .then(like => {
        if (like) {
            res.status(200).json({ message: 'User has liked this post.' });
        } else {
            res.status(200).json({ message: 'User has not liked this post.' });
        }
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
};