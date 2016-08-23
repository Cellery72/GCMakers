'use strict';
var User = require('../models/users.js');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var bcrypt = require('bcryptjs');
var transporter = nodemailer.createTransport('smtps://afield788%40gmail.com:<password>@smtp.gmail.com');

router.get('/users/', function (req, res) {

    User.find({}, function (err, users) {
        if (err) {
            console.log(err + " boops");
        } else {
            res.json(users);
        }
    });

});

//register a new user
router.post('/register', function (req, res) {
    console.log('<-- --- --- Registration Endpoint --- --- -->');
    var __user = req.body;

    //check if user is already registered
    User.findOne({
        'email': __user.email
    })
        .then(function (user) {
            if (!user) {
                //user does not exist
                var newUser = User({
                    firstName: __user.firstName,
                    lastName: __user.lastName,
                    email: __user.email,
                    password: __user.password
                });

                //encrypt password
                bcrypt.genSalt(12, function (err, salt) {
                    bcrypt.hash(__user.password, salt, function (err, hash) {

                        // Store hash in your password DB.
                        console.log(hash);
                        newUser.password = hash;

                        newUser.save(newUser)
                            .then(function (user) {

                                //remove password from response
                                delete user.password;
                                res.json({
                                    user: user,
                                    msg: 'Account Created'
                                });
                            })
                    });
                });

                newUser.save(function (err) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('User created!');
                    }
                });

            } else {
                res.json({
                    user: null,
                    msg: 'Email is already registered'
                })
            }
        });
});

router.post('/authenticate', function (req, res) {
    console.log('Authentication Endpoint');
    var __user = req.body;
    User.findOne({
        'email': __user.email
    })
    // send mail with defined transport object
    //transporter.sendMail(mailOptions, function(error, info){
    //    if(error){
    //        return console.log(error);
    //    }
    //    console.log('Message sent: ' + info.response);
    //});

module.exports = router;
