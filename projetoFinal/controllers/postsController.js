
const Post = require('../sequelize').Post;




// exports.getAllPosts = async (req, res, next) =>{
//     try {
//         const posts = await Post.findAll();
//         res.send(posts)
//     } catch (error) {
//         console.log(error)
//         res.status(401).send(JSON.stringify(error));
//     }
// }

// exports.getPostsById = async (req, res, next) =>{
//     try {
//         var postId = req.params.id;
//         const posts = await Post.findByPK(postId);
//         res.send(posts)
//     } catch (error) {
//         res.status(401).send(JSON.stringify(error));
//     }
// }


// exports.publishPost = async (req, res, next) =>{
//     try {
//         var post = req.body;
//         await posts.create(post);
//         res.send("created post with id: "+ post.id)
//     } catch (error) {
//         res.status(401).send(JSON.stringify(error));
//     }
// }

// exports.deletePost = async (req, res, next) =>{
//     try {
//         var post = req.params.id;
//         await Post.destroy({where:{
//             post_id: post
//         }});
//         res.send("deleted post with id: " + post)
//     } catch (error) {
//         res.status(401).send(JSON.stringify(post));
//     }
// }

// exports.updatePost = async (req, res, next) =>{
//     try {
//         var id = req.params.id;
//         var post = req.body;
//         await Post.update(post, {where:{
//             post_id: id
//         }});
//         res.send("updated post with id: "+ id)
//     } catch (error) {
//         res.status(401).send(JSON.stringify(error));
//     }
// }
