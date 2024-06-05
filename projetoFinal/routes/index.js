var express = require('express');
var router = express.Router();
var indexController = require("../controllers/indexController");


router.post('/signup', indexController.signup);


router.post('/login', indexController.login);


router.get('/logout', indexController.logout);

module.exports = router;