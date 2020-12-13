const jwt = require('jsonwebtoken');
const secret = "@jdS(jd!l";

module.exports = {
    generateJWT: payload => jwt.sign(payload, secret),
    verifyJWT : token => jwt.verify(token, secret)
}