const express = require('express');
const mongo = require('mongoose');
const Product = require('../model/product'); // Import the Product model
const router = express.Router();

router.delete('/deleteProduct/:productId', async (req, res) => {
  try {
    const id = req.params.productId; 

    if (!mongo.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }

    const deletedProduct = await Product.findByIdAndRemove(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product by ObjectId:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
