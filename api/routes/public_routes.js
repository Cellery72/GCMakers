'use strict';
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://<email>%40gmail.com:<pass>@smtp.gmail.com');


//register a new user
router.post('/sendEmail', function (req, res) {
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
    transporter.sendMail(mailOptions, function (error, info) {
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

module.exports = router;