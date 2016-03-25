var mongoose = require('mongoose');

var MemberSchema = new mongoose.Schema({
    name: {
        first: String,
        last: String
    },
    gender: Number,
    dateOfBirth: Date,
    address: {
        street: String,
        city: String,
        state: String,
        zip: Number
    },
    phoneNumber: {
        primary: Number,
        secondary: Number
    },
    emailAddress: {type: String, lowercase: true, unique: true},
    uspsaMemberNumer: String,
    uspsaExpiration: Date,
    nraMemberNumber: Number,
    nraExpiration: Date,
    fscMemberNumber: Number,
    ncpsExpiration: Date,
    ncpsSponsor: Number,
    ncpsStatus: Number,
    emergencyContact: {
        name: String,
        phoneNumber: Number
    },
    preCorp: Boolean,
    rangeOfficerCert: Number,
    rangeOfficerStatus: Number,
    rangeOfficerExpiration: Date,
    hasKey: Boolean
});

mongoose.model('Member', MemberSchema);
