const Blockchain = require('../Blockchain/Blockchain.js');
const Transaction = require('../Blockchain/Transaction.js');
const TransactionModel = require('../Modules/TransactionPool.js');

const blockchain = new Blockchain()


const getTransactions = async(req,res) => {
    try {
        const transactions = await TransactionModel.find();

        res.status(200).json(transactions);

    } catch (error) {
        console.log(error);
    }
}

const newTransaction = async (req, res) => {
    try {
        // console.log(req.body.data);
        const transactionsData = req.body.data
        const newTransactions = new Transaction(transactionsData.amount,transactionsData.payer,transactionsData.payee)

        if (!newTransactions.isValid()){
            return res.status(400).json({ error: "Invalid transaction(s)" });
        }

        const addTransaction = await blockchain.addToTransactionPool(newTransactions);



        res.status(200).json(addTransaction);
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    getTransactions,
    newTransaction
};