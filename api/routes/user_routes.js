'use strict';
var User = require('../models/users.js');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var bcrypt = require('bcryptjs');

var transporter = nodemailer.createTransport('smtps://afield788%40gmail.com:<password>@smtp.gmail.com');

var testUser = User({
    firstName: 'GC',
    lastName: 'Makers',
    email: 'makers@georgiancollege.ca',
    password: 'E212isHome',
    admin: 'true'
});

var testUser2 = User({
    firstName: 'Amanda',
    lastName: 'Field',
    email: 'afield@georgiancollege.ca',
    password: '1',
    admin: 'true'
});

bcrypt.genSalt(10, function (err, salt) {
    //encrypt password
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(testUser.password, salt, function (err, hash) {
            // Store hash in your password DB. 
            testUser.password = hash;
            testUser.save(testUser)
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
});

//// setup e-mail data with unicode symbols 
//var mailOptions = {
//    from: '"Platform" <amanda@platform.com>', // sender address 
//    to: newUser.email, // list of receivers 
//    subject: 'Hello ' + newUser.name, // Subject line 
//    text: 'You have logged in', // plaintext body 
//};

//save test user
//testUser.save(function (err) {
//    if (err) {
//        console.log(err)
//    } else {
//        console.log('User created!');
//    }
//});

//GET ALL USERS
router.get('/users', function (req, res) {
    console.log('Users endpoint');
    User.find(req.body).then(function (users) {
        console.log(users);
        res.json({
            users: users
        });
    })

});

//ADD USER
router.post('/register', function (req, res) {
    console.log('Registration Endpoint');
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
                    admin: __user.admin,
                    password: __user.password
                });
                console.log(newUser);

                //encrypt password
                bcrypt.genSalt(10, function (err, salt) {
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

//UPDATE USER
router.put('/update/:userId', function (req, res) {
    console.log('Updating User: ' + req.params.userId);
    var __user = req.body;
    console.log(__user);
    var update = {
        firstName: __user.firstName,
        lastName: __user.lastName,
        email: __user.email,
        admin: __user.admin,
        updated_at: new Date()
    }

    var query = {
        "_id": req.params.userId
    }
    User.update(query, update, {}, function (err, user) {
        if (err) {
            console.log(err);
            res.status(400).json({
                err: err
            })

        } else {
            res.json({
                user: user
            });
        }
    })
})

//DELETE USER
router.delete('/delete/:userId', function (req, res) {
    console.log('User ' + req.params.userId + ' Deleted');

    User.findOne({
        "_id": req.params.userId
    }, function (err, user) {
        user.remove(function (err) {
            if (err) {
                console.log(err);
                res.status(400)
                    .json({
                        err: err
                    })
            } else {
                res.json({
                    deleted: true
                })
            }
        })
    });

});

//USER AUTHENTICATION
router.post('/authenticate', function (req, res) {
    console.log('Authentication Endpoint');
    var __user = req.body;
    User.findOne({
            'email': __user.email
        })
        .then(function (user) {
            if (user) {
                console.log(user);
                //check incoming password against encrypted version
                bcrypt.compare(__user.password, user.password, function (err, valid) {
                    if (valid) {
                        //remove password from response
                        delete user.password;
                        //set web token
                        var user_obj = {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email
                        };
                        var token = jwt.sign(user_obj, 'randomsalt');
                        res.set('authentication', token);
                        res.json({
                            user: user,
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
        })

});
// send mail with defined transport object 
//transporter.sendMail(mailOptions, function(error, info){
//    if(error){
//        return console.log(error);
//    }
//    console.log('Message sent: ' + info.response);
//});

module.exports = router;