var express = require('express');
var router = express.Router();
var usersController = require("../controllers/usersController");

router.get('/', usersController.getAllUsers);

module.exports = router;
