const {verifyJWT} = require('../helpers/jwt');

module.exports = {
    authentication: async (req, res, next) => {
        try {
            const token = req.cookies.token;
            const admin = verifyJWT(token);
            next();
        } catch(err) {
            console.error(err)
            res.status(403).json({message: 'Forbidden'})
        }
    }
}