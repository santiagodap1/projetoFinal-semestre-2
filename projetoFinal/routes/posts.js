var express = require('express');
var router = express.Router();
var usersController = require("../controllers/postsController");

router.get('/', usersController.getAllPosts);

module.exports = router;
