const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

const User = require('../models/User');

exports.getSignupPage = (req, res) => {
    res.render('signup.ejs');
}

exports.postSignupPage = (req, res) => {
    const FName = req.body.FName;
    const LName = req.body.LName;
    const UserName = req.body.UserName;
    const Email = req.body.Email;
    const Password = req.body.Password;

    bcrypt.hash(Password, 10).then(hashedPass => {
        const user = new User({
            FName: FName,
            LName: LName,
            UserName: UserName,
            Email: Email,
            Password: hashedPass
        }).save().then(user => {
            console.log('user created!');
            res.redirect('/user/login');
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.getLoginPage = (req, res) => {
    res.render('login.ejs');
}

exports.postLoginPage = (req, res) => {
    const Email = req.body.Email;
    const Password = req.body.Password;

    User.findOne({
        Email: Email
    }).then(user => {
        bcrypt.compare(Password, user.Password, (err, result) => {
            if (result) {
                req.session.isLoggedin = true;
                req.session.user = user;
                res.redirect('/expense/dashboard');
                console.log('login successful');
            } else {
                console.log(err);
                res.redirect('/user/login');
            }
        });
    }).catch(err => {
        console.log(err);
        res.redirect('/user/signup');
    });
}

exports.getLogout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/user/login');
    })
}