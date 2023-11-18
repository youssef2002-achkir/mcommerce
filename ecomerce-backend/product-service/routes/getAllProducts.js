const express = require('express');
const Products = require('../model/product');

const router = express.Router();

router.get('/all' , async (req, res) => {
    try {
        const products = await Products.find();
        // console.log('Retrieved products:', products);
        if(!products){
            res.status(404).json({error: "No Produact is Available for the moment"});
        }
        res.json(products);
    } catch(error){
        console.error('ERROR FETCHING PRODUCTS', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

module.exports = router;