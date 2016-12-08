'use strict';
var express = require('express'),
    Member = require('../models/members.js'),
    router = express.Router();


//GET - Get all members

//PUT - Add new member
router.put('/add', function(req, res){
    console.log('<-- --- --- Add Member Endpoint BEGIN--- --- -->');
    var __member = req.body;

    Member.findOne({
            email: __member.email
        }).then(function(member){
            if(!member){
                console.log(__member)
                var newMember = Member(__member);

                newMember.save(function(err){
                    err ? console.log(err) : res.json({
                        msg: 'Thank you for joining Makers Club ' + newMember.firstName
                    })
                })
            }else{
                console.log('Member\'s email already exists');
                res.json({
                    user: null,
                    msg: 'This email is already assigned to a previous member!'
                });
            }
        })
})
//POST - Edit member by ID

//DELETE - Delete member by ID

module.exports = router;
