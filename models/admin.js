const {model, Schema} = require('mongoose');
const {hashPassword} = require('../helpers/bcrypt');

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

adminSchema.pre('save', function (next) {
    this.password = hashPassword(this.password);

    next();
})

module.exports = model('Admin', adminSchema);