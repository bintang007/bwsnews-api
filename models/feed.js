const {model, Schema} = require('mongoose');
const Parser = require('rss-parser');
const parser = new Parser();
const index = require('../helpers/algoliasearch');
const fetch = require('node-fetch');

const feedSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    url: {
        type: String,
        unique: true,
        required: true
    }
}, {timestamps: true})

feedSchema.pre('save', function (next) {
    this.url = this.url.toLowerCase();
    const thisFeed = this;

    parser.parseURL(this.url).then(value => {
        if (value.items.length !== 0) {
            fetch(`https://api.unsplash.com/photos/random?orientation=landscape&count=${value.items.length}`, {
                headers: {
                    'Authorization': 'Client-ID 1xcyFZgk80D7QuZvdij5XRTWtRCWK4VPKS3jUUWA5mo'
                }
            })
                .then(res => res.json())
                .then(json => {
                    value.items.map(function (item, idx) {
                        index.saveObject({
                            ...item,
                            feedId: thisFeed._id,
                            urlImage: this[idx]
                        }, {autoGenerateObjectIDIfNotExist: true})
                    }, json.map(value => value.urls.regular))
                    next();
                })

        } else {
            next({status: 404, message: 'Articles not found'})
        }
    }).catch(_ => next({status: 404, message: 'URL Feed not found'}))
})

feedSchema.pre('findOneAndUpdate', function (next) {

    console.log(this._id)
    // parser.parseURL(this.url).then(value => {
    //     if (value.items.length !== 0) {
    //         value.items.map(item => {
    //             index.saveObject({...item, feedId: this._id}, {autoGenerateObjectIDIfNotExist: true})
    //         })
    //         next();
    //     } else {
    //         next({status: 404, message: 'Articles not found'})
    //     }
    // }).catch(_ => next({status: 404, message: 'URL Feed not found'}))
})

module.exports = model('Feed', feedSchema);