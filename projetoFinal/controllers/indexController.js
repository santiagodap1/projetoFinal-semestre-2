const User = require('../sequelize').User;
var jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

function generateAccessToken(email, password) {
    var token = jwt.sign({ email, password }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
    return token;
}



// {
//     "username": "test1434",
//     "email": "testse@gmail.com",
//     "password": "teste1"
// }
exports.signup = function (req, res) {
    const { email, password, username } = req.body;

    User.findOne({
        where: {
            [Op.or]: [
                { username: username },
                { email: email }
            ]
        }
    }).then(existingUser => {
        if (existingUser) {
            let message = '';
            if (existingUser.email === email) {
                message = 'That email is already taken.';
            } else {
                message = 'That username is already taken.';
            }
            req.flash('signupMessage', message);
            return res.status(409).json({ error: message }); 
        }
        return User.create({ email: email, password: password, username: username });
    }).then(newUser => {
        
        const token = generateAccessToken(email, password);
        req.session.user = newUser;
        req.session.token = token;
        res.status(200).json({ user: newUser, token });
    }).catch(err => {

        req.flash('signupMessage', err.message);
        // res.redirect('/signup');
    });
};



exports.login = function (req, res) {
    var { email, password } = req.body;
    User.findOne({
        where: {
            email: email
        }
    }).then(user => {
        if (user == null) {
            res.status(401).json({message: 'No user found with that e-mail'}); 
        }
        else if (user.password != password) {            
            res.status(401).json({message: 'Oops! Wrong password.'}); 
        } else {
            const token = generateAccessToken(email, password);   
            req.session.token = token;
            req.session.user = user;   
            res.status(200).json({ user, token });     
        }
    }).catch(function (err) {
        req.flash('loginMessage', err);
        // res.redirect('/login');
    });
}

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
        } else {
            // res.redirect('/login');
        }
    });
}