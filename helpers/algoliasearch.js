const algoliasearch = require('algoliasearch');

const client = algoliasearch('TMFK5ZS09I', 'dfc12007d5483addb57f309d906524f7');
const index = client.initIndex('dev_ARTICLES');

module.exports = index;