const PostLike = require('../sequelize').PostLike;



exports.getLikesOfPost = async (req, res, next) =>{
    try {
        var postId = req.params.id;
        const likes = await PostLike.findByPK(postId);
        res.send(likes)
    } catch (error) {
        res.status(401).send(JSON.stringify(error));
    }
}


//me quede aqui esta funcion esta mal
exports.LikePost = async (req, res, next) =>{
    try {
        var postId = req.params.id;
        //tenho que procurar o id do user
        await PostLike.create(post);
        res.send("created post with id: "+ post.id)
    } catch (error) {
        res.status(401).send(JSON.stringify(error));
    }
}

exports.deletePost = async (req, res, next) =>{
    try {
        var post = req.params.id;
        await Post.destroy({where:{
            post_id: post
        }});
        res.send("deleted post with id: " + post)
    } catch (error) {
        res.status(401).send(JSON.stringify(post));
    }
}

exports.updatePost = async (req, res, next) =>{
    try {
        var id = req.params.id;
        var post = req.body;
        await Post.update(post, {where:{
            post_id: id
        }});
        res.send("updated post with id: "+ id)
    } catch (error) {
        res.status(401).send(JSON.stringify(error));
    }
}
