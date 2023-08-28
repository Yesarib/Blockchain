const crypto = require('crypto');


class Wallet {
    constructor(password) {
        this.privateKey = this.generateKeyPair().cleanPrivateKey
        this.publicKey = this.generateKeyPair().cleanPublicKey
        this.balance = 0;
        this.password= password
    }

    generateKeyPair() {
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 512, 
            publicKeyEncoding: {
                type: 'pkcs1', 
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs1', 
                format: 'pem',
            }
        });

        const cleanPrivateKey = privateKey.replace("/-----BEGIN RSA PRIVATE KEY-----|-----END RSA PRIVATE KEY-----/g", '');
        const cleanPublicKey = publicKey.replace("/-----BEGIN RSA PUBLIC KEY-----|-----END RSA PUBLIC KEY-----/g", '');

    
        return { cleanPrivateKey, cleanPublicKey };
    }
}

class UserWallet extends Wallet{
    constructor(privateKey, publicKey, password) {
        super(privateKey, publicKey, password);
    }

    checkBalance() {
        return this.balance;
    }

}

class MinerWallet extends Wallet{
    constructor(privateKey,publicKey,password) {
        super(privateKey,publicKey,password)
    }

    collectRewards(reward) {
        this.balance += reward; 
    }
}



module.exports = {
    Wallet,
    MinerWallet,
    UserWallet
}
