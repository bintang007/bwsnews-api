const Article = require('../models/article');
const Parser = require('rss-parser');
const parser = new Parser();

const index = require('../helpers/algoliasearch');
//
const express = require('express');
const app = express();
app.use(express.json());

app.use('/post', async (req, res) => {
    const {url} = req.body;
    try {
        const feed = await parser.parseURL(url);
        const result = await index.saveObjects(feed.items, {autoGenerateObjectIDIfNotExist: true});
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json(err);
    }

})

app.use('/search', async (req, res) => {
    const {query} = req.body;
    const result = await index.search(query);
    res.status(200).json(result);
});

// index.setSettings({
//     searchableAttributes: [
//         "content",
//         "title"
//     ]
// }).then(_=> console.log('Success!'))