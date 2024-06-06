var express = require('express');
var router = express.Router();
var postsController = require("../controllers/postsController");
var postLikesController = require("../controllers/post_likesController");
var commentsController = require("../controllers/commentsController");
const authenticateToken = require('../middleware/authenticateToken');
const upload = require('../middleware/multerConfig.js'); 

router.use(authenticateToken);

router.get('/user/:userId', postsController.getUserPosts);
router.get('/:postId', postsController.getPostById);

router.post('/', upload, postsController.createPost);

router.delete('/:postId', postsController.deletePost);
router.put('/:postId',upload, postsController.updatePost);
router.get('/following/:userId', postsController.getFollowingPosts);

router.post('/like', postLikesController.likePost);
router.post('/unlike', postLikesController.unlikePost);
router.post('/hasliked', postLikesController.hasLikedPost);

router.post('/comments', commentsController.createComment);
router.delete('/comments/:comment_id', commentsController.deleteComment);

module.exports = router;
