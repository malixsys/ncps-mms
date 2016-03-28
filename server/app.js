/* jshint esversion: 6 */
/* jshint node: true */
"use strict";
let express = require('express');
let mongoose = require('mongoose');
let app = express();

app.use(express.static(__dirname + "/../client"));

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
