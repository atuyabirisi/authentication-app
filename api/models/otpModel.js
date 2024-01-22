const { Schema, model } = require('mongoose');

const OtpModel = model('otp', new Schema({
    email: {
        type: String,
        unique: true,
    },
    otp: String,
    createdAt: Date,
    expireAt: Date,
}));

module.exports.OtpModel = OtpModel;