const Blockchain = require('./Blockchain/Blockchain.js')

async function validateBlock(block) {
    const blockchain = new Blockchain();


    const prevBlock = blockchain.getLastBlock()
    const difficulty = blockchain.difficulty

    if (block.prevHash !== prevBlock.hash) {
        return false
    }

    if (blockHash.starsWith(difficulty) !== '0'.repeat(difficulty)) {
        return false;
    }

    return true;
}


module.exports = validateBlock