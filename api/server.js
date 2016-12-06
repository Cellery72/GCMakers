'use strict';

var express = require('express');
var port = 8080;
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config/global');

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(__dirname + './../app/'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Database
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected to db at /data/db/");
});


//routes
var user_routes = require('./routes/user_routes.js');
app.use('/', user_routes);

var public_routes = require('./routes/public_routes');
app.use('/',public_routes);

app.on('close', function() {
    console.error('dropping db');
    db.db.dropDatabase(function() {
        console.error('closing db connection');
        mongoose.connection.close();
    })
})

//Connection
app.listen(port, function() {
    console.log('Listening on http://localhost:' + port);
    console.log('Stop Server with CTRL + C');
});
