const Blockchain = require('../Blockchain/Blockchain.js')
const BlockchainModel = require('../Modules/BlockchainMode.js')


const blockchain = new Blockchain()


const getBlocks = async (req, res) => {
    try {
        const blocks = await BlockchainModel.find();

        res.status(200).json(blocks);

    } catch (error) {
        console.log(error);
    }
}



const newBlock = async(req,res) => {
    
    const newBlock = req.body.block;
    console.log(req.body);
    // console.log("New Blok " + JSON.stringify(newBlock.block));
    await blockchain.newBlock(newBlock)

    res.status(200).json(newBlock);

}

const getLastBlock = async(req,res) => {
    try {
        const lastBlock = await blockchain.getLastBlock();
        // console.log(lastBlock);
        res.status(200).json(lastBlock)
    } catch (error) {
        console.log(error);
    }
}

const getDiffuculty = async(req,res) => {
    try {
        const difficulty = await blockchain.getDifficulty();
        // console.log(difficulty);
        res.status(200).json(difficulty)
    } catch (error) {
        console.log(error);        
    }
}

module.exports = {
    getBlocks,
    newBlock,
    getLastBlock,
    getDiffuculty
};