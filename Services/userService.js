const axios = require('axios');
require('dotenv').config();
let token = process.env.PAYSTACK_KEY
module.exports.verifyAcct = async (account_number,bank_code) => {
    try {
        const config = { headers: { 'Authorization': `Bearer ${token}` } }
        const response = await axios.get(`https://api.paystack.co/bank/resolve?account_number=${account_number}&bank_code=${bank_code}`, config)
        return response.data

    } catch (error) {
        console.log(error.response.data)
        return {status:false}
    }
}
