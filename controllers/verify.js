const Feed = require('../models/feed');

module.exports = {
    nameFeed: async (req, res) => {
        const {name, url} = req.body;

    },
    urlFeed: async (req, res) => {
        const {url} = req.body

        const result = await Feed.findOne({url: {$regex: new RegExp(url, "i")}})
        if (result) {
            res.status(400)
        } else {
            res.status(200)
        }
    }
}