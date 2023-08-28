const { getLastBlock, getDifficulty } = require('../Context/Block.js')

async function validateBlock(block) {
    const prevBlock = await getLastBlock()
    const difficulty = await getDifficulty()
    const blockHash = block.hash

    if (block.prevHash !== prevBlock.hash) {
        return false
    }

    // if (blockHash.starsWith(difficulty) !== '0'.repeat(difficulty)) {
    //     return false;
    // }

    return true;
}


module.exports = validateBlock