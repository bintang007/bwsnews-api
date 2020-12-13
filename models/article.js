const {model, Schema} = require('mongoose');

const articleSchema = new Schema({
    feed: {
        type: Schema.Types.ObjectId,
        ref: 'Feed'
    },

})

module.exports = model('Article', articleSchema);

