const SHA256 = require('crypto-js/sha256')


class GenesisBlock {
    constructor() {
        this.timestamp = "2023-08-06 12:00:00";
        this.previous_block_hash = '0';
        this.nonce = 12345;
        this.merkle_root = "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6";
        this.network_parameters = {
            difficulty: 3,
            block_interval: 10
        };
        this.index = 0;
        this.initial_reward = 50;
        this.creator_identity = "SampleBlockchainCompany";
        this.start_state = {
            accounts: [
                {
                    address: "0x1234567890abcdef",
                    balance: 1000
                },
                {
                    address: "0xabcdef1234567890",
                    balance: 500
                }
            ]
        };
        this.hash = this.createHash();
    }

    createHash() {
        const dataToHash = (
            this.timestamp +
            this.previous_block_hash +
            this.nonce +
            this.merkle_root +
            JSON.stringify(this.network_parameters) +
            this.initial_reward +
            this.creator_identity +
            JSON.stringify(this.start_state)
        ).toString();
        return SHA256(dataToHash).toString();
    }

    
}

module.exports = GenesisBlock;
