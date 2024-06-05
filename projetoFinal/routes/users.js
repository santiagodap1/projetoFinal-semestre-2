var express = require('express');
var router = express.Router();
var usersController = require("../controllers/usersController");
var followsController = require("../controllers/followsController");

router.get('/', usersController.getAllUsers);
router.get('/:userId', usersController.getUserById);
router.put('/:userId', usersController.updateUser);
router.delete('/:userId', usersController.deleteUser);



router.get('/:userId/followers', followsController.getAllFollowers);
router.get('/:userId/followers/count', followsController.getFollowerCount);
router.get('/:userId/following', followsController.getAllFollowing);
router.get('/:userId/following/count', followsController.getFollowingCount);
router.post('/follow', followsController.followUser);
router.delete('/unfollow', followsController.unfollowUser);
router.get('/isFollowing', followsController.isFollowing);

module.exports = router;
