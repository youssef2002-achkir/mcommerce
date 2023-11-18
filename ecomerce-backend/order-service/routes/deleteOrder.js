const express = require('express');
const mongo = require('mongoose');
const Order = require('../model/order'); // Import the Product model
const router = express.Router();

router.delete('/deleteOrder/:orderId', async (req, res) => {
  try {
    const id = req.params.orderId; 

    if (!mongo.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }

    const deletedOrder = await Order.findByIdAndRemove(id);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order by ObjectId:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
