const {validationResult} = require('express-validator');
const Feed = require('../models/feed');
const index = require('../helpers/algoliasearch');
const Parser = require('rss-parser');
const parser = new Parser();


module.exports = {
    index: async (req, res, next) => {
        const feed = await Feed.find();
        res.status(200).json(feed);
    },

    create: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        const {name, url} = req.body;

        try {
            await Feed.create({
                name: name,
                url: url
            })

            res.status(200).json({message: 'Create successfully!'})
        } catch ({message, status}) {
            res.status(status).json({message})
        }

    },

    read: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        const {id} = req.params;

        try {
            const feed = await Feed.findById(id)
            if (feed) {
                res.status(200).json(feed)
            } else {
                res.status(200).json({message: 'Data not found'})
            }

        } catch (err) {
            res.status(500).json({message: 'Internal server error'})
        }

    },
    update: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        const {id} = req.params;
        const data = req.body;

        try {
            await Feed.findOneAndUpdate({_id: id}, {
                $set: data
            })
            res.status(200).json({message: 'Update successfully!'})
        } catch ({status, message}) {
            res.status(status || 400).json({message})
        }

    },
    destroy: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        try {
            const {id} = req.params;
            const feed = await Feed.findByIdAndRemove(id)
            res.status(200).json(feed)
        } catch (err) {
            res.status(400).json({message: 'Not found'})
        }

    }
}