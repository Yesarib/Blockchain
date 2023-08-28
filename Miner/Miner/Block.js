const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(data, prevHash, index, merkleRoot, difficulty) {
        this.transaction = data;
        this.prevHash = prevHash;
        this.nonce = 0;
        this.index = index
        this.time = new Date();
        this.hash = this.createHash();
        this.merkleRoot = merkleRoot
        this.difficulty = difficulty
    }

    createHash() {
        return SHA256(
            this.time + JSON.stringify(this.transaction) + this.prevHash + this.nonce
        ).toString();
    }


    proofOfWork(difficulty) {
        const targetPrefix = '0'.repeat(difficulty);

        let nonce = 0;
        let found = false;

        while (!found) {
            this.nonce = nonce; 
            this.hash = this.createHash();

            if (this.hash.substring(0, difficulty) === targetPrefix) {
                found = true;
            } else {
                nonce++;
            }
        }

        return nonce;
    }


}

module.exports = Block