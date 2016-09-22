'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    author: {
        type: Object,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true
    },
    replies: [],
    created_at: Date


});


commentSchema.pre('save', function (next) {
    // Get the current date.
    var currentDate = new Date();
    this.created_at = currentDate;
    // Continue.
    next();
});

var Comment = mongoose.model('commentSchema', commentSchema);

module.exports = Comment;
