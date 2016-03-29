/* jshint esversion: 6 */
/* jshint node: true */
"use strict";
let express = require('express');
let mongoose = require('mongoose');
var bodyParser = require('body-parser');
let app = express();

app.use(express.static(__dirname + "/../client"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost/ncps', (err) => {
    if (err) {
        console.log('Error connecting to Mongo - make sure mongo is running...');
        process.exit(1);
    }

    console.log('Connected to Mongo');
});

require('./models/member');

var members = require('./routes/member');

// app.get("/members", (request, response) => {
//     response.json(["Chad", "Lawrence", "Matt"]);
// });

app.use('/members', members);

var port = process.env.port || 3000;

app.listen(port, () => console.log("listening on " + port));
