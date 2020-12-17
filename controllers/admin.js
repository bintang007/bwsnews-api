const Admin = require('../models/admin');
const {validationResult} = require('express-validator')
const {comparePassword} = require('../helpers/bcrypt')
const {generateJWT} = require('../helpers/jwt');
module.exports = {
    login: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

        const {username, password} = req.body;

        const admin = await Admin.findOne({username});
        if (admin && comparePassword(password, admin.password)) {
            const {name} = admin
            const token = generateJWT({name})
            res.cookie('token', token, {httpOnly: true})
            res.status(200).json({message: 'Login Successfully!'})
        } else {
            res.status(403).json({message: 'Forbidden'})
        }
    },
    register: async (req, res, next) => {   
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()})

        const {username, name, password} = req.body;

        await Admin.create({username, name, password})

        res.status(200).json({message: 'Successfully register!'});
    }
}