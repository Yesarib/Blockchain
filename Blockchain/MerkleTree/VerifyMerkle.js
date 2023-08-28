
const verifyMerkle = (transactionHash, proof, root) => {
    let currentHash = transactionHash;

    for (const proofElement of proof) {
        const combined = currentHash + proofElement;
        currentHash = hashData(combined);
    }

    return currentHash === root;
}

export default verifyMerkle;