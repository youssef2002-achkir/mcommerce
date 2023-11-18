const express = require('express');
const mongo = require('mongoose');
const Product = require('../model/product');
const router = express.Router();

router.put('/updateProduct/:productId', async (req, res) => {
    try {
        const id = req.params.productId;
        if(!mongo.Types.ObjectId.isValid(id)){
            return res.status(400).json({error: 'Inavalid Id'});
        }

        const { title, description, price, image} = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, {
            title, 
            description, 
            price, 
            image
        }, {new : true});

        if(!updatedProduct) {
            return res.status(404).json({error: 'No Product found'});
        }

        res.json(updatedProduct);
    } catch(error) {
        console.error('Error Updating The product: ', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

module.exports = router;