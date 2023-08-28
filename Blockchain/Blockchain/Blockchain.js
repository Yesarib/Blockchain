const BlockchainModel = require('../Modules/BlockchainMode.js');
const GenesisBlock = require('./GenesisBlock.js');
const TransactionModel = require('../Modules/TransactionPool.js');
const Transaction = require('./Transaction.js');
const { sendReward } = require('../Controllers/Wallet.js');


class Blockchain {
    constructor() {
        if (Blockchain.instance) {
            return Blockchain.instance;
        }
        this.chain = []
        this.initializeChain()
        this.transactionsPool = [];
        this.transactionPool()
        this.difficulty = 4;    
        Blockchain.instance = this;

    }


    async initializeChain() {
        const blocks = await BlockchainModel.find();
        // console.log(blocks);
        if (blocks.length === 0) {
            this.chain.push(new GenesisBlock());
        } else {
            this.chain.push(blocks)
        }

    }

    async getLastBlock() {
        const blocks = await BlockchainModel.find();
        const lastBlock = blocks[blocks.length - 1]
        // console.log(lastBlock);
        return lastBlock.block[0]
    }

    async transactionPool() {
        const transactions = await TransactionModel.find();
        this.transactionsPool = transactions
    }

    async addToTransactionPool(transaction) {
        if (transaction !== null) {
            const newTransaction = new Transaction(transaction.amount, transaction.payer, transaction.payee)

            this.transactionsPool.push(newTransaction)

            const savedTransacation = TransactionModel({
                amount: newTransaction.amount,
                payer: newTransaction.payer,
                payee: newTransaction.payee,
                fee: newTransaction.fee,
                signature: newTransaction.signature
            })

            await savedTransacation.save()

        }

    }

    async newBlock(block) {
        try {
            if (block !== null) {
                const prevBlock = await this.getLastBlock()
                this.chain.push(block);
                const savedBlock = BlockchainModel({
                    block: block,
                })

                
                this.setDiffuclty(prevBlock, block)
                // console.log("Diff =>   " + this.difficulty);
                console.log('New Block added to blockchain');
                this.deleteTransactions(block.transaction)
                await savedBlock.save();
                
            }

        } catch (error) {
            console.log(error);
        }

    }


    deleteTransactions(transactionsToAdd) {
        const transactionIdsToDelete = transactionsToAdd.map(transaction => transaction._id);

        TransactionModel.deleteMany({ _id: { $in: transactionIdsToDelete } })
            .then((res) => {
                console.log('Bloğa eklenen transactionlar silindi', res);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async getDifficulty() {
        return this.difficulty;
    }


    setDiffuclty(prev, block) {
        // Her 2023 blokta bir

        try {

            const prevB = JSON.stringify(prev)
            const prevObj = JSON.parse(prevB)
            const timeStr = prevObj.time
            const prevTime = new Date(timeStr)
            const blockTime = new Date(block.time);

            // console.log(block.time);


            const diff = blockTime - prevTime

            const timeDiff = diff / (1000 * 60)
            // console.log("Time diff " + timeDiff);
            if (timeDiff < 5) {
                this.difficulty += 1
            }
            else {
                this.difficulty -= 1
            }

            return timeDiff
        } catch (error) {
            console.log(error);
        }

    }



    isValid() {
        for (let i = 0; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const prevBlock = this.chain[i - 1]

            if (currentBlock.index === 0) {
                continue
            }
            if (currentBlock.prevHash !== prevBlock.hash) {
                return false;
            }
            if (!currentBlock.transactions.every(transaction => transaction.isValid())) {
                return false;
            }


        }
        return true;
    }


}

module.exports = Blockchain;
