function generateOTP(){
    try {
        const otp = `${Math.floor(Math.random()*100000)}`;
        return otp;
    } catch(error) {
        throw error;
    }
}

module.exports.generateOTP = generateOTP;