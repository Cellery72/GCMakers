'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var uploadSchema = new Schema({
    img: {
        data: Buffer,
        contentType: String
    }
});

var Upload = mongoose.model('uploadSchema', uploadSchema);

module.exports = Upload;
