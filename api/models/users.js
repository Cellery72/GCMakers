'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
<<<<<<< HEAD
=======
    admin: {
        type: Boolean,
        required: true
    },
>>>>>>> a62ef02b750378e6fbcdf416595ad34befba9383
    created_at: Date,
    updated_at: Date
});

userSchema.pre('save', function (next) {
    // Get the current date.
    var currentDate = new Date();
    // Change the updated_at field to current date.
    this.updated_at = currentDate;
    // If created_at doesn't exist, add to that field
    if (!this.created_at) {
        this.created_at = currentDate;
    }
    // Continue.
    next();
});

userSchema.methods.summary = function () {
    var summary = "\nName: " + this.name + "\nUsername: " + this.username + "\nEmail: " + this.email + "\Password: " + this.password + "\n";
    console.log("Summary: \n" + summary);
    return summary;
};

var User = mongoose.model('userSchema', userSchema);

<<<<<<< HEAD
module.exports = User;
=======
module.exports = User;
>>>>>>> a62ef02b750378e6fbcdf416595ad34befba9383
