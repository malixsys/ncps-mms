var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');
var router = express.Router();
var passport = require('passport');
var config = require('../config');

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var Member = mongoose.model('Member');
var User = mongoose.model('User');

var auth = jwt({ secret: config.secret, userProperty: 'payload' });

// all of these routes are prefixed by /member/

router.route('/setup')
    .post((req, res) => {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ message: 'Please provide a username and password.' });
        }

        var user = new User();

        user.username = req.body.username;
        user.setPassword(req.body.password);

        user.save((err) => {
            if (err) return res.status(500).json({ message: 'Could not save user.' });

            return res.json({
                token: user.generateJWT()
            });
        });
    });

router.route('/auth')
    .post((req, res, next) => {
        if (!req.body.username || !req.body.password)
            return res.status(400).json({ message: 'Please fill out all fields.' });

        console.log('entering passport.authenticate');
        passport.authenticate('local', (err, user, info) => {
            if (err) return next(err);
            console.log('user is ' + user.username);
            if (user) {
                console.log('token: ' + user.generateJWT());
                return res.json({ token: user.generateJWT() });
            } else
                return res.status(401).json(info);
        })(req, res, next);
    });

router.route('/')
    .get(auth, (req, res) => {
        console.log('Inside member.js routes...');
        Member.find((err, member) => {
            if (err) return next(err);

            res.json(member);
        });
    })
    .post(auth, (req, res) => {
        var member = new Member(req.body);

        member.save((err, member) => {
            if (err) res.send(err);

            res.json(member);
        });
    });

router.route('/:id')
    .delete(auth, (req, res) => {
        Member.remove({'_id': req.params.id}, (err, member) => {
            if (err) res.send(err);

            res.json({message: 'Successfully deleted member.'});
        });
    })
    .get(auth, (req, res) => {
        Member.find({'_id': req.params.id}, (err, member) => {
            if (err) res.send(err);

            res.json(member);
        });
    })
    .put(auth, (req, res) => {
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
