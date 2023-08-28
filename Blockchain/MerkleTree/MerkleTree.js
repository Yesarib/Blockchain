const SHA256 = require('crypto-js/sha256')

const MerkleTreeAlgorithm = (transactions) => {
    function hashData(data) {
        return SHA256(data).toString();
    }

    const leaves = transactions.map(hashData);
    while (leaves.length > 1) {
        const level = [];

        for (let i = 0; i < leaves.length; i += 2) {
            const left = leaves[i];
            const right = i+1<leaves.length ? leaves[i + 1] : '';
            const combined = left + right;
            const hashCombined = hashData(combined);
            level.push(hashCombined);
        }
        leaves.length = 0;
        leaves.push(...level);
    }

    return leaves[0];
};

module.exports = {
    MerkleTreeAlgorithm
};