'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var replySchema = new Schema({
    creator: {
        type: Object,
        required: true,
    },
    message: {
        type: String,
        required: true,
        unique: true
    },
<<<<<<< HEAD
    admin: {
        type: Boolean,
        required: true,
    },
=======
>>>>>>> a62ef02b750378e6fbcdf416595ad34befba9383
    replies: [],
    created_at: Date


});


replySchema.pre('save', function (next) {
    // Get the current date.
    var currentDate = new Date();
    this.created_at = currentDate;
    // Continue.
    next();
});
var Reply = mongoose.model('replySchema', replySchema);

module.exports = Reply;