'use strict';
var User = require('../models/users.js');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var bcrypt = require('bcryptjs');
var transporter = nodemailer.createTransport('smtps://afield788%40gmail.com:<password>@smtp.gmail.com');
// //Admin Test User
// bcrypt.genSalt(12, function(err, salt){
//     bcrypt.hash("1", salt, function(err,hash){
//         var testUser = User({
//             firstName: 'Makers',
//             lastName: 'Admin',
//             email: 'admin@georgiancollege.ca',
//             password: hash,
//             admin: 'true'
//         });
//
//         testUser.save(function(err, user){
//             if(err){
//                 console.log(err);
//             }else{
//                 console.log('User ' + user + 'created');
//             }
//         })
//     });
// });

// GET all Users
router.get('/users/', function(req, res) {
    User.find({}, function(err, users) {
        err ? console.log(err) : res.json(users);
    });
});

// Register (POST) a new User
router.post('/register', function(req, res) {
    console.log('<-- --- --- Registration Endpoint BEGIN--- --- -->');
    var __user = req.body;
    //check if user is already registered
    User.findOne({
            'email': __user.email
        })
        .then(function(user) {
            if (!user) {
                //user does not exist
                var newUser = User({
                    firstName: __user.firstName,
                    lastName: __user.lastName,
                    email: __user.email,
                    password: __user.password,
                    admin: false
                });
                //encrypt password
                bcrypt.genSalt(12, function(err, salt) {
                    bcrypt.hash(__user.password, salt, function(err, hash) {
                        // Store hash in your password DB.
                        newUser.password = hash;
                        newUser.save(newUser)
                            .then(function(user) {
                                //remove password from response
                                delete user.password;
                                console.log(user);
                                res.json({
                                    user: user,
                                    msg: 'Account Created'
                                });
                            })
                    });
                });
                newUser.save(function(err) {
                    err ? console.log(err) : console.log('User Created!');
                });
            } else {
                console.log('Email already exists');
                res.json({
                    user: null,
                    msg: 'Email is already registered'
                });
            }
        });
    console.log('<-- --- --- Registration Endpoint END --- --- -->');
});

// Authenticate (POST) a current User
router.post('/login', function(req, res) {
    console.log('<-- --- --- Login Endpoint BEGIN --- --- -->');
    var __user = req.body;
    User.findOne({
            'email': __user.email
        })
        .then(function(user) {
            if (user) {
                //check incoming password against encrypted version
                bcrypt.compare(__user.password, user.password, function(err, valid) {
                    if (valid) {
                        //remove password from response
                        delete user.password;
                        //set web token
                        var user_obj = {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            admin: user.admin
                        };
                        var token = jwt.sign(user_obj, 'randomsalt');
                        res.set('authentication', token);
                        res.json({
                            user: user_obj,
                            msg: 'Authenticated'
                        });
                    } else {
                        res.json({
                            user: null,
                            msg: 'Email/Password is incorrect'
                        })
                    }
                });
            } else {
                res.json({
                    user: null,
                    msg: 'Email/Password is incorrect'
                })
            }
        });
    console.log('<-- --- --- Login Endpoint END --- --- -->');
})

//UPDATE USER
router.post('/update', function (req, res) {
    console.log('ay');
    // console.log('Updating User: ' + req.params.userId);
    // var __user = req.body;
    // var update = {
    //     firstName: __user.firstName,
    //     lastName: __user.lastName,
    //     email: __user.email,
    //     admin: __user.admin,
    //     updated_at: new Date()
    // }
    //
    // var query = {
    //     "_id": req.params.userId
    // }
    // User.update(query, update, {}, function (err, user) {
    //     if (err) {
    //         console.log(err);
    //         res.status(400).json({
    //             err: err
    //         })
    //
    //     } else {
    //         res.json({
    //             user: user
    //         });
    //     }
    // })
})

module.exports = router;
