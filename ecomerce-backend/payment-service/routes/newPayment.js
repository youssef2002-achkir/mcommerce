const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const Payment = require('../model/payment');



// Function to get an order by its ID
async function getOrderById(orderId) {
  try {
    // Make an HTTP GET request to the Order Service's getOrderById endpoint
    const response = await axios.get(`http://localhost:5001/orders/all/${orderId}`);

    // Handle the response from the Order Service
    if (response.status === 200) {
      // Process the order data, e.g., store it or use it for payment
      const orderData = response.data;
      console.log('Order retrieved:', orderData);
    } else {
      console.error('Failed to retrieve order');
    }
  } catch (error) {
    console.error('Error getting order:', error.message);
  }
}
async function updatePaymentStatus(orderId) {
    try {
      const response = await axios.put(`http://localhost:5001/orders/updateOrder/${orderId}`, {
        paymentStatus: true,
      });
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error updating payment status:', error.message);
      return null;
    }
  }
const router = express.Router();

router.post('/newPayment', async (req, res) => {
    try {
        const {orderId, paymentRising, cardId } = req.body;
        const ID = req.body.orderId;
        if (!ID) {
            return res.status(400).json({ error: 'orderId is missing in the request body' });
          }
        if(!mongoose.Types.ObjectId.isValid(ID)){
            return res.status(400).json({error: 'Inavalid Id'});
        }
        const existingPayment = await Payment.findOne({ orderId });

        if (existingPayment) {
            return res.status(400).json({ error: 'This order already paid' });
        }
        const newPayment = new Payment({
            orderId, 
            paymentRising, 
            cardId 
        });

        await newPayment.save();
        updatePaymentStatus(newPayment.orderId);
        
        const paidOrder= getOrderById(newPayment.orderId);

        console.log('Paid order', paidOrder);
        res.json({ message: 'Payment created Succefully'})
    } catch(error) {
        console.error("ERROR CREATING PAYMENT", error);
        res.status(500).json({ error : "Internal Server Error"})
    }
});

module.exports = router;