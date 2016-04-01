var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var Member = mongoose.model('Member');

// all of these routes are prefixed by /member/

router.route('/')
    .get(function(req, res) {
        Member.find((err, member) => {
            if (err) return next(err);

            res.json(member);
        });
    })
    .post(function(req, res) {
        var member = new Member(req.body);

        member.save((err, member) => {
            if (err) res.send(err);

            res.json(member);
        });
    });

router.route('/:id')
    .delete((req, res) => {
        Member.remove({'_id': req.params.id}, (err, member) => {
            if (err) res.send(err);

            res.json({message: 'Successfully deleted member.'});
        });
    })
    .get((req, res) => {
        Member.find({'_id': req.params.id}, (err, member) => {
            if (err) res.send(err);

            res.json(member);
        });
    })
    .put((req, res) => {
        Member.findById(req.params.id, (err, member) => {
            if (err) res.send(err);

            member = req.body;

            member.save((err) => {
                if (err) {
                    console.log('Could not save changes.');
                    res.send(err);
                }

                res.json({member});
            });
        });
    });

module.exports = router;
