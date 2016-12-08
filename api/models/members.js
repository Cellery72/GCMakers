'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MemberSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    program: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
});


var Member = mongoose.model('memberSchema', MemberSchema);

module.exports = Member;
