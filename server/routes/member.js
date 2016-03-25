var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Member = mongoose.model('Member');

router.route('/')
    .get(function(req, res, next) {
        Member.find(function(err, member) {
            if (err) return next(err);

            res.json(member);
        });
    });

router.route('/:id')
    .get(function(req, res, next) {
        Member.find({'_id': req.params.id}, function(err, member) {
            if (err) return next(err);

            res.json(member);
        });
    });

router.route('/new')
    .post(function(req, res, next) {
        setTimeout(function() {
            var member = new Member({
                'name.first': req.params.firstName,
                'name.last': req.params.lastName,
                'emailAddress': req.params.emailAddress
            });

            member.save(function(err) {
                if (err) return next(err);
            });
        }, 1000);
    });

module.exports = router;
