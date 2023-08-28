const axios = require('axios')

const BASE_URL = "http://localhost:3000"

const getTransactions = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/transaction/transactions`);
        return response.data;
    } catch (err) {
        console.log(err);
        return [];
    }
};


module.exports = {
    getTransactions
}
