const express = require('express');
const Order = require('../model/order');
const mongo = require('mongoose');

const router = express.Router();

router.get('/all/:orderId' , async (req, res) => {
    try {
        const id = req.params.orderId;
        if (!mongo.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ObjectId' });
          }
        const order = await Order.findById(id);
        if(!order){
            res.status(404).json({ error: "No Such Order Here"})
        };
        console.log(order);
        res.json(order);
        
    } catch(error){
        console.log('ERROR GETTING YOUR ORDER', error);
        // res.status(500).json({ error: "Internal Server Error"});
    }
});

module.exports = router;