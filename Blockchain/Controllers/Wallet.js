const { UserWallet, MinerWallet } = require('../Modules/Wallets.js');
const Wallet = require('../Wallets/Wallets.js')


const getUserWalletById = async(req,res) => {
    const { id } = req.body

    const userWallet = await UserWallet.findById(id);
    // console.log(userWallet);
    res.status(200).json(userWallet)
}
const newUserWallet = async(req,res) => {
    const { password } = req.body

    const newUserWallet = new Wallet.UserWallet(password);

    console.log(newUserWallet);

    const savedUserWallet = await UserWallet({
        privateKey: newUserWallet.privateKey,
        publicKey: newUserWallet.publicKey,
        balance: newUserWallet.balance,
        password: newUserWallet.password
    })

    await savedUserWallet.save()
    res.status(200).json(newUserWallet);

}


const getMinerById = async(req,res) => {
    const { id } = req.body

    const minerWallet = await MinerWallet.findById(id);
    // console.log(userWallet);
    res.status(200).json(minerWallet)
}

const newMinerWallet = async(req,res) => {
    const { password } = req.body

    const newMinerWallet = new Wallet.MinerWallet(password);
    console.log(newMinerWallet);

    const savedMinerWallet = await MinerWallet({
        privateKey: newMinerWallet.privateKey,
        publicKey: newMinerWallet.publicKey,
        balance: newMinerWallet.balance,
        password: newMinerWallet.password
    })

    await savedMinerWallet.save()
    res.status(200).json(newUserWallet);

}

const sendReward = async(req,res) => {
    console.log("Body" + req.body.id);
    const minerId  = req.body.id;

    try {
        const minerWallet = await MinerWallet.findById(minerId)
        // console.log(minerWallet);
        if (!minerWallet) {
            return res.status(404).json({ message: 'Miner not found.' });
        }

        minerWallet.balance += 50;
        await minerWallet.save();

        res.status(200).json({ message: 'Reward received successfully.' });
    } catch (error) {
        console.error('Error updating balance:', error);
        res.status(500).json({ message: 'An error occurred.' });
    }


}




module.exports = {
    getUserWalletById,
    newUserWallet,
    getMinerById,
    newMinerWallet,
    sendReward
}