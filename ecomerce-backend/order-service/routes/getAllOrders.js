const express = require('express');
const Orders = require('../model/order');

const router = express.Router();

router.get('/all' , async (req, res) => {
    try {
        const orders = await Orders.find();
        // console.log('Retrieved products:', products);
        if(!orders){
            res.status(404).json({error: "No Order is Available for the moment"});
        }
        res.json(orders);
    } catch(error){
        console.error('ERROR FETCHING ORDERS', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

module.exports = router;