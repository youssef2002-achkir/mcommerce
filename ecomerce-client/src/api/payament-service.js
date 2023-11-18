// CustomModal.js

export const addPayment = (orderId, paymentRising, cardId) => {
    fetch('http://localhost:5002/payments/newPayment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId, 
        paymentRising, 
        cardId
      }),
    })
      .then((response) => response.json())
      
      .catch((error) => {
        console.error('Error adding the payment:', error);
      });
  };

