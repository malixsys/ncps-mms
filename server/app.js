"use strict";
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let app = express();
let jwt = require('jsonwebtoken');
let expressJwt = require('express-jwt');
var config = require('./config');
var passport = require('passport');

app.use(express.static(__dirname + "/../client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

mongoose.connect('mongodb://localhost/ncps', (err) => {
    if (err) {
        console.log('Error connecting to Mongo - make sure mongo is running...');
        process.exit(1);
    }
    console.log('Connected to Mongo');
});

require('./models/member');
require('./models/user');
require('./config/passport');

var members = require('./routes/member');

app.use('/members', members);

var port = process.env.port || 3030;

if (!module.parent) {
    app.listen(port, () => {
        console.log("Listening on port " + port);
    });
}

module.exports = app;
