require('dotenv').config();
const { createTransport } = require('nodemailer');

const { LOGRLEMAIL, PASS, HOST } = process.env;
const transporter = createTransport({
    host: HOST,
    auth: {
        user: LOGRLEMAIL,
        pass: PASS,
    },
});

transporter.verify((error, success) => {
    if(error) console.log(error);
        console.log(success);
});

const sendEmail = async(mailOptions) => {
    try
    {
        await transporter.sendMail(mailOptions);
        return;
    }
    catch(error)
    {
        throw error;
    }
};

module.exports.sendEmail = sendEmail;