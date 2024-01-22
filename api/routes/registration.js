const express = require('express');
const router = express.Router();
const { UserModel, validateNewUser } = require('../models/newUserModel');
const { hashData } = require('../utilities/hashData');
const { sendOtp } = require('../utilities/emailController');

router.post('/', async(req, res) => {
    try {
        const { error } = validateNewUser(req.body);
        if(error) res.sendStatus(400).send(error.details[0].message);

        const { email, username, password } = req.body; 
        const existingUser = await UserModel.findOne({email});
        if(existingUser) return res.sendStatus(400).send('User Already Registered!');

        const newUser = new UserModel({
            email, 
            username,
            password,
        });
        const hashedPassword = await hashData(password);
        newUser.password = hashedPassword;

        await newUser.save();
        await sendOtp({ email, username });
        res.send(newUser);
    } catch(error) {
        throw error;
    }
});

module.exports = router;