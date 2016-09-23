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
    password: '1',
    admin: true
});

var testComment = Comment({
    author: testUser,
    message: 'First Tester message',
});
//
// console.log(testComment);
// testComment.save(function (err) {
//    if (err) {
//        console.log(err)
//    } else {
//        console.log('Comment Saved!');
//    }
// });
var testReply = Reply({
    author: testUser,
    message: 'This 33issss sthssssse firssssdt reply',
    admin: true
});
// ////console.log(testComment.replies);
// //
// testReply.save(function (err, reply) {
//     if (err) {
//         console.log(err);
//     } else {
//
//         console.log('reply saved');
//         Reply.find({}, function (err, replies) {
//             if (err) {
//
//                 console.log(err);
//             } else {
//
//                 //res.json(comments);
//                 replies[0].replies.push(reply);
//                 console.log(replies[0]);
//                 replies[0].save(function (err) {
//                     if (err) {
//                         console.log(err);
//                     } else {
//                         console.log('Reply added to reply');
//                     }
//                 })
//             }
//         });
//     }
// });
//
// var testReply2 = Reply({
//    author: testUser,
//    message: 'This is a replies reply',
//    admin: false
// });
//
// testReply2.save(function (err, reply) {
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
// });

// testComment.save();
// console.log(testComment)

// testComment.replies.push(testReply);
// testComment.save(function(err, comment){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(comment)
//     }
// })
//

// console.log
// Comment.findOne({
//    _id: "57e4a9a9ffa4581aae462590"
// }).then(function(comment){
//     comment.replies.push(testReply);
//     comment.save();
// })
//

//View all comments
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

//View all Replies
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

// Register (PUT) a new User
router.put('/addComment', function(req, res) {
    console.log('<-- --- --- Add Comment Endpoint BEGIN--- --- -->');
    var __comment = req.body;
                //user does not exist
                var newComment = Comment({
                    author: __comment.author,
                    message: __comment.message
                });
                newComment.save(function(err) {
                    err ? console.log(err) : console.log('Comment Added!');
                });
                res.json({
                    comment: newComment
                })
});

module.exports = router;
