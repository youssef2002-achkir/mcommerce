const express = require('express');
const mongo = require('mongoose');
const Order = require('../model/order');
const router = express.Router();

router.put('/updateOrder/:orderId', async (req, res) => {
    try {
        const id = req.params.orderId;
        if(!mongo.Types.ObjectId.isValid(id)){
            return res.status(400).json({error: 'Inavalid Id'});
        }

        const { orderQuantity, paymentStatus} = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(id, {
            orderQuantity,
            paymentStatus
        }, {new : true});

        if(!updatedOrder) {
            return res.status(404).json({error: 'No Order found'});
        }

        res.json(updatedOrder);
    } catch(error) {
        console.error('Error Updating The order: ', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

module.exports = router;