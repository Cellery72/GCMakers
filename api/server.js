'use strict';

var express = require('express');
var port = 8080;
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
<<<<<<< HEAD

=======
>>>>>>> a62ef02b750378e6fbcdf416595ad34befba9383
//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(__dirname + './../app/'));


//Database
mongoose.connect('mongodb://localhost/data/db/');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to db at /data/db/")
});

//Routes
var user_routes = require('./routes/user_routes.js');
app.use('/', user_routes);
//
<<<<<<< HEAD
//var upload_routes = require('./routes/upload_routes.js');
//app.use('/', upload_routes);
=======
var upload_routes = require('./routes/upload_routes.js');
app.use('/', upload_routes);
>>>>>>> a62ef02b750378e6fbcdf416595ad34befba9383
//var message_routes = require('./routes/message_routes.js');
//app.use('/', message_routes);

app.on('close', function () {
    console.error('dropping db');
    db.db.dropDatabase(function () {
        console.error('closing db connection');
        mongoose.connection.close();
    })
})

//Connection
app.listen(port, function () {
    console.log('Listening on http://localhost:' + port);
    console.log('Stop Server with CTRL + C');
});