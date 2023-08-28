const Block = require('./Block.js')
const { addBlock, getDifficulty, getLastBlock, getBlocks } = require('../Context/Block.js')
const { getTransactions } = require('../Context/Transactions.js')
const MerkleTreeAlgorithm = require('./MerkleTree.js')
const Socket = require('./socket.js')
const validateBlock = require('./ValidNewBlock.js')
const { sendReward } = require('../Context/Miner.js')

class Miner {
    constructor(minerId) {
        this.minerId = minerId || 'miner';
        // this.currentBlock = null,
        this.isMining = false;
        this.isMiningInProgress = false;
        this.chain = []
        this.socket = new Socket(); // Socket bağlantısı oluşturuluyor
        this.listenForNewBlocks(); // Yeni blokları dinlemek için fonksiyon çağrılıyor
        this.chainPromise = this.initializeBlocks();

    }

    async startMining() {
        if (!this.isMining) {
            this.isMining = true;
            while (this.isMining) {
                await this.mineBlock();
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }

    stopMining() {
        this.isMining = false;
    }

    async initializeBlocks() {
        const blocks = await getBlocks();
        this.chain.push(...blocks)
        return true;
    }

    async lastBlock() {
        await this.chainPromise;
        await this.initializeBlocks()
        if (this.chain.length === 1) {
            const lastBlock = this.chain[0];
            console.log(lastBlock);
            return lastBlock.block[0];

        }
        else {
            const lastBlock = this.chain[this.chain.length - 1];
            const strBlock = JSON.stringify(lastBlock)
            const jsBlock = JSON.parse(strBlock);
            console.log(jsBlock.block);
            return lastBlock.block[0] || jsBlock.block;

        }
    }

    listenForNewBlocks() {
        this.socket.socket.on('newBlock', (block) => {
            console.log(`Received new block:`, block);
            
            if (!this.chain.some(existingBlock => existingBlock.index === block.index)) {
                // Bloğu zincire ekle
                this.chain.push(block);
                console.log(`Block added to the chain by listening to newBlock event:`, block);
            } else {
                console.log(`Block already exists in the chain:`, block);
            }
        });
    }

    async mineBlock() {
        if (this.isMiningInProgress) {
            return; // Eğer zaten madencilik yapılıyorsa, yeni bir madencilik başlatma
        }
        try {
            const diff = await getDifficulty();
            const transactionsToAdd = await this.getUniqueTransactions();
            const merkleRoot = MerkleTreeAlgorithm(transactionsToAdd.map(transaction => JSON.stringify(transaction)))
            const prevBlock = await this.lastBlock()


            if (transactionsToAdd.length > 0) {
                const currentBlock = new Block(transactionsToAdd, prevBlock.hash, prevBlock.index + 1, merkleRoot, diff);
                console.log(`Miner ${this.minerId} is mining...`);
                currentBlock.proofOfWork(currentBlock.difficulty);
                if (validateBlock(currentBlock)) {
                    this.socket.emitNewBlockMined(this.minerId,currentBlock)
                    this.chain.push(currentBlock)                             
                } else {
                    console.log(`Block mined by Miner ${this.minerId} is invalid.`);
                }
            } else {
                console.log("There are no transactions to mine.");
            }

        } catch (error) {
            console.log(error);
        }
    }
    

    async getUniqueTransactions() {
        const transactions = await getTransactions();
        const shuffledTransactions = this.shuffleArray(transactions);
        const uniqueTransactions = shuffledTransactions.filter((transaction, index, self) => {
            return self.findIndex(t => t.id === transaction.id) === index;
        });
        return uniqueTransactions;
    }


    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

}

module.exports = Miner;