const mongoose = require('mongoose')


const UserWalletSchema = new mongoose.Schema({
    privateKey: { type: String, required: true },
    publicKey: { type: String, required: true },
    balance: { type: Number, default: 0 },
    password: { type:String, required:true}
});

const UserWallet = mongoose.model('UserWallet', UserWalletSchema);



const MinerWalletSchema = new mongoose.Schema({
    privateKey: { type: String, required: true },
    publicKey: { type: String, required: true },
    balance: { type: Number, default: 0 },
    password: { type:String, required:true}

});

const MinerWallet = mongoose.model('MinerWallet', MinerWalletSchema);

module.exports = { UserWallet, MinerWallet };