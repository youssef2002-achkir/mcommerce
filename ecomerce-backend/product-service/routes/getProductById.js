const express = require('express');
const Product = require('../model/product');
const mongo = require('mongoose');

const router = express.Router();

router.get('/all/:productId' , async (req, res) => {
    try {
        const id = req.params.productId;
        if (!mongo.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ObjectId' });
          }
        const product = await Product.findById(id);
        if(!product){
            res.status(404).json({ error: "No Such Product Here"})
        };
        res.json(product);
        
    } catch(error){
        console.log('ERROR GETTING YOUR PRODUCT', error);
        res.status(500).json({ error: "Internal Server Error"});
    }
});

module.exports = router;