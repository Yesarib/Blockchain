const axios = require('axios')

const BASE_URL = "http://localhost:3000"


const getMinerById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/getLastBlock`,{
            id:id
        });
        return response.data;
    } catch (err) {
        console.log("HATA");
        return [];
    }
};

const sendReward = async ( minerId ) => {
    try {
        const response = await axios.post(`${BASE_URL}/wallet/sendReward`, {
            id: minerId,
        });
        return response.data
    } catch (error) {
        console.error('Error sending reward:', error);
    }
};


module.exports = {
    getMinerById,
    sendReward
}