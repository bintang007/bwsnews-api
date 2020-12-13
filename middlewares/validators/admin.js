const {body} = require('express-validator');
const Admin = require('../../models/admin');

module.exports = {
    login: [body('username').notEmpty(), body('password').notEmpty()],
    register: [body('name').notEmpty(), body('username').notEmpty().isLength({min: 6}).custom(input => {
        return Admin.findOne({username: {$regex: new RegExp(input, "i")}}).then(admin => {
            if (admin) {
                return Promise.reject('Username already in use')
            }
        })
    }), body('password').notEmpty().matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\[\]:;<>,?\/~_+-=|\\]).{8,32}$/)
        .withMessage("Password must be at least 8 character long (require at least one digit, require at least one lowercase and uppercase letter and require at least one special character), but no more than 32")]

}