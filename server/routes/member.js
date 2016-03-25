var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Member = mongoose.model('Member');


// routes that end in /member
// router.get('/', function(req,res, next) {
//     res.send('reached members');
// });

// router.get('/', function(req, res, next) {
//     Member.find(function(err, member) {
//         if (err) return next(err);
//
//         res.json(member);
//     });
// });

router.route('/')
    .get(function(req, res, next) {
        Member.find(function(err, member) {
            if (err) return next(err);

            res.json(member);
        });
    });

module.exports = router;
