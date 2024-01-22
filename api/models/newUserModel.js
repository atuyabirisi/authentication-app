const { Schema, model} = require('mongoose');
const Joi = require('joi');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
});

const UserModel = model('member', userSchema);

function validateNewUser(user){
    const schema = Joi.object({
        email: Joi.string().email().required(),
        username: Joi.string().required(),
        password: Joi.string().required().min(6).max(1024),
    });
    return schema.validate({
        email: user.email,
        username: user.username,
        password: user.password,
    });
}


module.exports.UserModel = UserModel;
module.exports.validateNewUser = validateNewUser;