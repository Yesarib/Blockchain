const express = require('express')
const { getTransactions, newTransaction } = require('../Controllers/TransactionController.js')


const router = express.Router();


router.get('/transactions',getTransactions);
router.post('/newTransaction',newTransaction);

module.exports = router;
