const axios = require('axios');

const orderMakroAll = async (req, res) => {
    try {

        const response = await axios.get(process.env.urlMakro + '/api/orders?order_state_codes=SHIPPING&max=100&order=asc', {
            // const response = await axios.get(process.env.urlMakro + '/api/orders?start_date=2025-03-13T11:00:00Z&end_date=2025-03-15T00:00:00Z', {
            // const response = await axios.get(process.env.urlMakro + '/api/orders?order_ids=MAKROPRO14839154B-A,MAKROPRO14824453B-A,MAKROPRO14835933A-A,MAKROPRO14849334B-A,MAKROPRO14847435B-A,MAKROPRO14838517A-A,MAKROPRO14849511B-A,MAKROPRO14830911B-A', {
            headers: {
                Accept: 'application/json',
                Authorization: process.env.frontKeyMakro
            },
        },);

        return response.data;
    } catch (error) {
        console.error(error);
        res.json({ error: 'Internal server error' });
    }
};

module.exports = orderMakroAll;