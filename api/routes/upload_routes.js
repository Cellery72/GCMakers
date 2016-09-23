'use strict';
var Upload = require('../models/uploads.js');
var express = require('express');
var fs = require('fs');
var router = express();
var imgPath = 'bg.png';

Upload.remove(function (err) {
    if (err) throw err;

    console.error('removed old docs');

    // store an img in binary in mongo
    var upload = new Upload;
    upload.img.data = fs.readFileSync(imgPath);
    upload.img.contentType = 'image/png';
    upload.save(function (err, upload) {
        if (err) throw err;

        console.error('saved img to mongo');

        // start a demo server
        router.get('/uploads', function (req, res, next) {
            Upload.findById(upload, function (err, doc) {
                if (err) return next(err);

                res.contentType(doc.img.contentType);
                //                res.send(doc.img.data);
            });
        });

    });
});
//console.log(router);
//Upload.remove(function (err) {
//    if (err) throw err;
//
//    console.error('removed old docs');
//    var tempImg = new Upload;
//
//
//    tempImg.img.data = fs.readFileSync(imgPath);
//    tempImg.img.contentType = 'image/png';
//
//    tempImg.save(function (err, tempImg) {
//        if (err) throw err;
//
//        console.error('saved image');
//        router.get('/images', function (req, res, next) {
//
//            Upload.findById(tempImg, function (err, doc) {
//                if (err) return next(err);
//
//                console.log(doc.img.contentType);
//                res.contentType = doc.img.contentType;
//                res.send(doc.img.data);
//
//
//            });
//        });
//    });
//});
//


module.exports = router;
