const Follow = require("../sequelize.js").Follow

exports.getAllUsers = (req, res, next) => {
    Follow.findAll()
    .then(follow => {
        res.send(follow)
    }).catch( error => {
        res.status(500).send(JSON.stringify(error));
    })
}

