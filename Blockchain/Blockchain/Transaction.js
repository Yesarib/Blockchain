const SHA256 = require('crypto-js/sha256')


class Transaction {
    constructor(amount,payer,payee) {
        this.amount = amount
        this.payer = payer
        this.payee = payee
        this.fee = this.calculateFee()
        this.signature = this.createSignature()
    }

    createSignature() {
        return SHA256(this.amount + this.payer + this.payee).toString()
    }

    calculateFee(){
        if (this.amount < 10) {
            return 0.1
        }
        else if (this.amount <= 100) {
            return 0.5
        }
        else {
            return 1;
        }
    }

    toString() {
        return JSON.stringify(this)
    }

    isValid() {
        const expectedSignature = this.createSignature();
        return this.signature === expectedSignature;
    }
}

module.exports = Transaction;
