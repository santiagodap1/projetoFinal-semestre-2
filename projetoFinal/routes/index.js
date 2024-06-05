var express = require('express');
var router = express.Router();
var usersController = require("../controllers/usersController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// router.post('/login', function(req, res, next) {
//   res.send({ userid: 'Express' });
// });

router.post('/login', usersController.postUser);
module.exports = router;
