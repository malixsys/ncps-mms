/* jshint esversion: 6 */
/* jshint node: true */
"use strict";

let express = require('express');
let app = express();

app.use(express.static(__dirname + "/../client"));

app.get("/members", (request, response) => {
    response.json(["Chad", "Lawrence", "Matt"]);
});

app.listen(8181, () => console.log("listening on 8181"));
