require('dotenv').config();
const { OtpModel } = require('../models/otpModel')
const { generateOTP } = require('../utilities/generateOtp');
const { sendEmail } = require('../utilities/sendEmail');
const { hashData } = require('../utilities/hashData')


async function sendOtp({ email, username }){
    try {
        if(!email) throw Error('provide a valid email');
        await OtpModel.deleteOne({ email });

        const generatedOtp = generateOTP();
        const { LOGRLEMAIL } = process.env
        const mailOptions = {
            from: LOGRLEMAIL,
            to: email,
            subject: 'Logrl Account Verification Otp',
            html: `
            <p>Dear ${username},<br/>Use the One Time Password below to verify your Logrl Account</p>
            <p style= "color:tomato; font-size:25px; letter-spacing: 2px;"> <b>OTP: ${generatedOtp}</b></p>
            <p>This code <b>expires in 1 hour(s)</b></p> <P>Regards,<br/>Logrl Systems.</P>`     
        }
        await sendEmail(mailOptions);

        const hashedOtp = await hashData(generatedOtp);  
        const otpRecord = new OtpModel({
            email,
            otp: hashedOtp,
            createdAt: Date.now(),
            expireAt: Date.now() + 3600000,
        });

        const newOtpRecord = await otpRecord.save();
        return newOtpRecord;
    } catch(error) {
        throw error;
    }
}

module.exports.sendOtp = sendOtp;