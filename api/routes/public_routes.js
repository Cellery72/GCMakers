'use strict';
var express = require('express');
var Meeting = require('../models/meetings.js');
var router = express.Router();
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');

// theGenerator will create new access tokens to send mail from our account settings
var theGenerator = require('xoauth2').createXOAuth2Generator({
    user: 'georgianmakers@gmail.com',
    clientId: "287502208765-mb3fm3ffp9lvfue5ng1fvcf4c4dsktde.apps.googleusercontent.com",
    clientSecret: "y1_ieZw-Kk2Qh2e1-PnDYRZS",
    refreshToken: "1/qlJj6JVkL6dOOtc7A6i9nzc5m26SISMgdR0QQFRrXHA"
});
theGenerator.on('token', function(token) {
    console.log('New token for %s', token.user);
});
// theTransporter will be used to send mail
var theTransporter = nodemailer.createTransport(({
    service: 'gmail',
    auth: {
        xoauth2: theGenerator
    }
}));

/* EMAIL */

//Registration Email sent to a new user
router.post('/sendEmail', function(req, res) {
    console.log('<-- --- --- Message Send Endpoint BEGIN--- --- -->');
    var newContact = req.body;

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'georgianmakers@gmail.com', // sender address
        to: newContact.email, // reciever address
        subject: 'Welcome to the Makers Club ' + newContact.name + '!', // Subject line
        text: newContact.message // plaintext body
    };

    theTransporter.sendMail(mailOptions, function(err, info) {
        err ? console.log(err) : console.log('Email sent succesfully to ' + mailOptions.to);
        console.log('<-- --- --- Message Send Endpoint END--- --- -->');
        theTransporter.close();
    });
});

/* MEETING TIME */

//CREATE new meeting
router.post('/setMeeting', function(req, res) {
    console.log('<-- --- --- Change Meeting Endpoint BEGIN --- --- -->');
    var __meeting = req.body;
    //new Meeting
    var newMeeting = Meeting({
        date: __meeting.date,
        time: __meeting.time
    });
    newMeeting.save(function(err, meeting) {
        console.log(err || 'meeting saved');
    }).then(function(meeting) {
        res.json({
            meeting: newMeeting,
            msg: "Meeting set to: " + __meeting.date
        });
    });
    console.log('<-- --- --- Change Meeting Endpoint END --- --- -->');
});
// GET all meetings
router.get('/meetings/', function(req, res) {
    Meeting.find({}, function(err, meetings) {
        if (err) {
            console.log(err + " boops");
        } else {
            res.json(meetings);
            console.log(meetings);
        }
    });
});

router.get('/upcomingMeeting', function(req, res) {
    Meeting.find({
        "date": {
            $gte: new Date().toISOString()
        }
    }, function(err, meeting) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                meeting: meeting,
                msg: "Meeting retrieved successfully"
            });
        }
    }).sort({
        "date": 1
    }).limit(1);
});


module.exports = router;
