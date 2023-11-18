const express = require('express')
const Order = require('../model/order');

const router = express.Router();

router.post('/newOrder', async (req, res) => {
    try {
        const {productId, orderQuantity } = req.body;

        if (!req.body.productId) {
            return res.status(400).json({ error: 'productId is missing in the request body' });
          }
        const existingOrder = await Order.findOne({ productId });

        if (existingOrder) {
            return res.status(400).json({ error: 'An order with this productId already exists' });
        }
          
        const newOrder = new Order({
            productId,
            orderQuantity
        });

        await newOrder.save();

        res.json({ message: 'Order created Succefully'})
    } catch(error) {
        console.error("ERROR CREATING ORDER", error);
        res.status(500).json({ error : "Internal Server Error"})
    }
});

module.exports = router;