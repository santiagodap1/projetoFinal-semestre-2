const User = require("../sequelize.js").User

exports.getAllUsers = (req, res, next) => {
    User.findAll()
    .then(user => {
        res.send(user)
    }).catch( error => {
        res.status(500).send(JSON.stringify(error));
    })
}

