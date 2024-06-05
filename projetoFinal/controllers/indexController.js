const User = require('../sequelize').User;
var jwt = require('jsonwebtoken');

function generateAccessToken(email, password) {
    var token = jwt.sign({ email, password }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
    return token;
}

exports.signup = function (req, res) {
    const { email, password, username } = req.body;
    User.findOne({
        where: { email: email }
    }).then(result => {
        if (result != null) {
            req.flash('signupMessage', 'That email is already taken.');
            return res.redirect('/signup');
        }
        return User.findOne({
            where: { username: username }
        });
    }).then(result => {
        if (result != null) {
            req.flash('signupMessage', 'That username is already taken.');
            return res.redirect('/signup');
        }

        return User.create({ email: email, password: password, username: username });
    }).then(user => {
        const token = generateAccessToken(email, password);
        req.session.user = user;
        req.session.token = token;
        res.status(200).json({ user, token });
        res.redirect('/home');
    }).catch(err => {
        req.flash('signupMessage', err.message);
        res.redirect('/signup');
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
        res.redirect('/login');
    });
}

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/login');
        }
    });
}