const mongoose = require('mongoose')

const blockchainSchema = new mongoose.Schema({
    block : Array
});

const BlockchainModel = mongoose.model('Blockchain', blockchainSchema);

module.exports = BlockchainModel