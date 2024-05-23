
const Post = require('../sequelize').Post;




exports.getAllPosts = async (req, res, next) =>{
    try {
        const posts = await Post.findAll();
        res.send(posts)
    } catch (error) {
        res.status(401).send(JSON.stringify(error));
    }
}

exports.getPostsById = async (req, res, next) =>{
    try {
        var postId = req.params.id;
        const posts = await Post.findByPK(postId);
        res.send(posts)
    } catch (error) {
        res.status(401).send(JSON.stringify(error));
    }
}


exports.postUser = async (req, res, next) =>{
    try {
        var user = req.body;
        await User.create(user);
        res.send("created loan with id: "+ user.id)
    } catch (error) {
        res.status(401).send(JSON.stringify(error));
    }
}

exports.deleteUser = async (req, res, next) =>{
    try {
        var user = req.params.id;
        await User.destroy({where:{
            user_id: user
        }});
        res.send("deleted loan with id: " + user)
    } catch (error) {
        res.status(401).send(JSON.stringify(error));
    }
}

exports.updateUser = async (req, res, next) =>{
    try {
        var id = req.params.id;
        var user = req.body;
        await User.update(user, {where:{
            user_id: id
        }});
        res.send("updated loan with id: "+ id)
    } catch (error) {
        res.status(401).send(JSON.stringify(error));
    }
}
