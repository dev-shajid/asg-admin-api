const jwt = require('jsonwebtoken')

// signing jwt
async function signJwtToken(payload, options = { expiresIn: '6d' }) {
    try {
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, options);
        return token;
    } catch (error) {
        return error
    }
}


// verifying jwt
async function verifyJwtToken(token) {
    try {
        const secret = process.env.JWT_SECRET;
        const payload = jwt.verify(token, secret);
        return payload;
    } catch (error) {
        console.error(error);
        return { error };
    }
}

module.exports = { signJwtToken, verifyJwtToken }