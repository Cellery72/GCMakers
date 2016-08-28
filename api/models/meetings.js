'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var meetingSchema = new Schema({
    date: {
        type: String,
        required: true
    }
});

var Meeting = mongoose.model('meetingSchema', meetingSchema);

module.exports = Meeting;
