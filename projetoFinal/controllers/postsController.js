
const Post = require('../sequelize').Post;
const Follow = require("../sequelize").Follow; 

exports.getUserPosts = (req, res, next) => {
    const userId = req.params.userId;

    Post.findAll({
        where: { user_id: userId }
    })
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
};


exports.getPostById = (req, res, next) => {
    const postId = req.params.postId;

    Post.findByPk(postId)
    .then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found.' });
        }
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
};


exports.createPost = (req, res, next) => {
    const { user_id, content, image } = req.body;

    Post.create({
        user_id: user_id,
        content: content,
        image: image
    })
    .then(post => {
        res.status(201).json(post);
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
};




exports.deletePost = (req, res, next) => {
    const postId = req.params.postId;

    Post.destroy({
        where: { post_id: postId }
    })
    .then(() => {
        res.status(200).json({ message: 'Post deleted successfully.' });
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
};

exports.updatePost = (req, res, next) => {
    const postId = req.params.postId;
    const { content, image } = req.body;

    Post.update({
        ...(content && { content: content }),
        ...(image && { image: image })
    }, {
        where: { post_id: postId }
    })
    .then(() => {
        res.status(200).json({ message: 'Post updated successfully.' });
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
};

exports.getFollowingPosts = (req, res, next) => {
    const userId = req.params.userId;

    Follow.findAll({
        where: { follower_id: userId }
    })
    .then(follows => {
        const followedIds = follows.map(follow => follow.followed_id);

        Post.findAll({
            where: { user_id: { [Op.in]: followedIds } }
        })
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
};