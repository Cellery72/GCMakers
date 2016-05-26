'use strict';
var User = require('../models/users.js');
var Comment = require('../models/comments.js');
var Reply = require('../models/replies.js');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;

var testUser = User({
    firstName: 'Amanda',
    lastName: 'Field',
    email: 'afield@brainstation.io',
    password: '1'
});
//
var testComment = Comment({
    creator: testUser,
    title: 'First Commsent Title',
    message: 'First Tester message',
    admin: true
});

//console.log(testComment);
//testComment.save(function (err) {
//    if (err) {
//        console.log(err)
//    } else {
//        console.log('Comment Saved!');
//    }
//});
var testReply = Reply({
    creator: testUser,
    message: 'This 33issss sthssssse firssssdt reply',
    admin: true
});
//////console.log(testComment.replies);
////
testReply.save(function (err, reply) {
    if (err) {
        console.log(err);
    } else {

        console.log('reply saved');
        Reply.find({}, function (err, replies) {
            if (err) {

                console.log(err + " boops");
            } else {

                //res.json(comments);
                replies[0].replies.push(reply);
                console.log(replies[0]);
                replies[0].save(function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Reply added to reply');
                    }
                })
            }
        });
    }
});

//var testReply2 = Reply({
//    creator: testUser,
//    message: 'This is a replies reply',
//    admin: false
//});
//
//testReply2.save(function (err, reply) {
//    if (err) {
//        console.log(err);
//    } else {
//
//        console.log('reply saved');
//        testReply.replies.push(reply);
//        testReply.save(function (err, reply) {
//            if (err) {
//                console.log(err);
//            } else {
//                console.log('Reply saved to Comment' + reply);
//            }
//        })
//    }
//});
//
//testComment.replies.push('hopefully');
//
//
router.get('/comments/', function (req, res) {

    Comment.find({}, function (err, comments) {
        if (err) {

            console.log(err + " boops");
        } else {

            res.json(comments);
            console.log(comments);
        }
    });
});



console.log(Comment);

router.get('/replies/', function (req, res) {

    Reply.find({}, function (err, replies) {
        if (err) {

            console.log(err + " boops");
        } else {

            res.json(replies);
            console.log(replies);
        }
    });
});


module.exports = router;