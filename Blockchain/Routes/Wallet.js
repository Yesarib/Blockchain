const express = require('express')
const { newUserWallet, getUserWalletById, newMinerWallet, getMinerById, sendReward } = require('../Controllers/Wallet.js')

const router = express.Router();

// USER
router.get('/userGetById',getUserWalletById);
router.post('/newUserWallet', newUserWallet);


// MINER
router.get('/minerGetById',getMinerById);
router.post('/newMinerWallet', newMinerWallet)
router.post('/sendReward', sendReward)

module.exports = router;
