const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    amount: Number,
    payer: String,
    payee: String,
    fee : Number,
    signature: String
});

const TransactionModel = mongoose.model('TransactionPool', transactionSchema);

module.exports = TransactionModel