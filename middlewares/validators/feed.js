const Feed = require('../../models/feed');
const {body, param} = require('express-validator');

module.exports = {
    read: [param('id').matches(/^[0-9a-fA-F]{24}$/).withMessage('Not valid ObjectId')],
    create: [body('name').notEmpty().withMessage('Name must not empty'), body('url').notEmpty().isURL().withMessage('URl not valid').custom(input => {
        return Feed.findOne({url: {$regex: new RegExp(input, "i")}}).then(feed => {
            if (feed) {
                return Promise.reject('URL already in use')
            }
        })
    })],
    update: [param('id').matches(/^[0-9a-fA-F]{24}$/).withMessage('Not valid ObjectId'), body('url').optional().isURL().custom(input => {
        return Feed.findOne({url: {$regex: new RegExp(input, "i")}}).then(feed => {
            if (feed) {
                return Promise.reject('URL already in use')
            }
        })
    })],
    destroy: [param('id').notEmpty()]
}