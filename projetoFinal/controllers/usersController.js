const User = require("../sequelize.js").User
var jwt = require('jsonwebtoken')
const { Op } = require("sequelize");



exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;

    User.destroy({
        where: { user_id: userId }
    })
    .then(() => {
        res.status(200).json({ message: 'User deleted successfully.' });
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
};

exports.updateUser = (req, res, next) => {
    const userId = req.params.userId;
    const { username, email, password } = req.body;

    
    User.findOne({
        where: {
            [Op.or]: [
                { username: username },
                { email: email }
            ]
        }
    })
    .then(user => {
        if (user && user.user_id !== userId) {
            res.status(400).json({ message: 'Username or email already exist.' });
        } else {
            
            User.update({
                ...(username && { username: username }),
                ...(email && { email: email }),
                ...(password && { password: password }) 
            }, {
                where: { user_id: userId }
            })
            .then(() => {
                res.status(200).json({ message: 'User updated successfully.' });
            })
            .catch(error => {
                res.status(500).json({ error: error.message });
            });
        }
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
};

exports.getAllUsers = (req, res, next) => {
    User.findAll()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
};

exports.getUserById = (req, res, next) => {
    const userId = req.params.userId;

    User.findByPk(userId)
    .then(user => {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
};