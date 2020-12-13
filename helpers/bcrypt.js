const bcrypt = require('bcrypt');

module.exports = {
    hashPassword: password => bcrypt.hashSync(password, bcrypt.genSaltSync(8)),
    comparePassword: (password, hash) => bcrypt.compareSync(password, hash)
}