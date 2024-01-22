const { hash } = require('bcrypt');

async function hashData(data, saltRounds = 10){
    try {
        const hashedOtp = await hash(data, saltRounds);
        return hashedOtp;
    } catch (error) {
        throw error;
    }
}

module.exports.hashData = hashData;