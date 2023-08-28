const axios = require('axios')

const BASE_URL = "http://localhost:3000"

const getLastBlock = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getLastBlock`);
        // console.log(response.data);
        return response.data;
    } catch (err) {
        console.log("HATA");
        return [];
    }
};

const getBlocks = async() => {
    try {
        const response = await axios.get(`${BASE_URL}/blocks`)
        // console.log(response.data);
        return response.data
    } catch (error) {
        console.log('Hata');
    }
}

const addBlock = async (block) => {
    try {
        await axios.post(`${BASE_URL}/newBlock`,{
            block: block
        })
        .then((res) => {
            if(res.status === 200){
                console.log('Block send to blockchain');
            }
        })
        .catch((err) => console.log(err))
    } catch (error) {
        
    }
}

const getDifficulty = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/getDifficulty`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getLastBlock,
    getDifficulty,
    addBlock,
    getBlocks
}