const Miner = require('./Miner/Miner.js');
const crypto = require('crypto')

async function main() {

    const miner1 = new Miner(uuidv4())
    
    miner1.startMining()
    
}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

main();