'use strict';
var express = require('express');
var Meeting = require('../models/meetings.js');
var router = express.Router();
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://<email>%40gmail.com:<pass>@smtp.gmail.com');


/* EMAIL */
//register a new user
router.post('/sendEmail', function(req, res) {
    console.log('<-- --- --- Message Send Endpoint --- --- -->');
    var newContact = req.body;
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: newContact.email, // sender address
        to: newContact.email, // list of receivers
        subject: 'Makers Contact - ' + newContact.name, // Subject line
        text: newContact.message, // plaintext body
    };



    //send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            return res.json({
                user: null,
                msg: "Error sending email",
            });

        } else {
            console.log('Message sent successfully' + info.response);
            res.json({
                user: newContact,
                msg: "Message sent"
            })
        }

    });
});




/* MEETING TIME */
//new meeting
router.post('/setMeeting', function(req, res) {
    console.log('<-- --- --- Change Meeting Endpoint --- --- -->');
    var __meeting = req.body;
    //new Meeting
    var newMeeting = Meeting({
        date: __meeting.date,
        time: __meeting.time
    });
    newMeeting.save(function(err,meeting){
      if(err){
        console.log(err);
      }else{
        console.log("meeting saved");
      }
    }).then(function(meeting) {
            res.json({
                meeting: newMeeting,
                msg: "Meeting set to: " + __meeting.date
              })
          })
      });
//get meetings
router.get('/meetings/', function (req, res) {
    Meeting.find({}, function (err, meetings) {
        if (err) {
                console.log(err + " boops");
        } else {

            res.json(meetings);
            console.log(meetings);
        }
    });
});


//get next meeting
router.post('/upcomingMeeting/', function (req, res) {

    Meeting.find({"date":{$gte: new Date().toISOString()}},function(err,meeting){
      if(err){
        console.log(err);
      }else{
        res.json({
          meeting: meeting,
          msg: "Meeting retrieved successfully"
        });
        console.log(meeting);
      }
    }).sort({"time":1}).limit(1);
});




module.exports = router;
