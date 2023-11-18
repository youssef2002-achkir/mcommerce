const express = require('express')
const Product = require('../model/product');

const router = express.Router();

router.post('/createProduct', async (req, res) => {
    try {
        const {title, description, price, image } = req.body;

        const newProduct = new Product({
            title, 
            description, 
            price, 
            image
        });

        await newProduct.save();

        res.json({ message: 'Product created Succefully'})
    } catch(error) {
        console.error("ERROR CREATING PRODUCT", error);
        res.status(500).json({ error : "Internal Server Error"})
    }
});

module.exports = router;