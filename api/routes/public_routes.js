'use strict';
var express = require('express');
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
theGenerator.on('token', function (token) {
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
router.post('/sendEmail', function (req, res) {
    console.log('<-- --- --- Message Send Endpoint BEGIN--- --- -->');


    // Get the contact info from request
    var newContact = req.body;

    // setup e-mail data with unicode symbols
    var mailOptions = {
        sent: newContact.email, // sender address
        to: 'georgianmakers@gmail.com', // reciever address
        subject: newContact.name + ' - ' + newContact.subject, // Subject line
        text: newContact.message // plaintext body
    };

    // 'Send' the actual mail..
    theTransporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            // there's an error, better tell an adult
            res.json({
                error: err,
                msg: "Email not sent"
            });
            console.log("Email Not Sent");
            console.log(err);
        }
        else{
            // keep calm carry on
            res.json({
                error: null,
                msg: "Email sent succesfully"
            });
            console.log("Email sent!");
        }

        // close the transporter and be done with it
        theTransporter.close();
    });


    console.log('<-- --- --- Message Send Endpoint END--- --- -->');
});


module.exports = router;
