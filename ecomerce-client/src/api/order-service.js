export const createOrder = (productId, orderQuantity) => {
    fetch('http://localhost:5001/orders/newOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
        orderQuantity,
      }),
    })
      .then((response) => response.json())
      
      .catch((error) => {
        console.error('Error creating the order:', error);
      });
  };

export async function  getAllOrders(){
  try {
    const response = await fetch(`http://localhost:5001/orders/all`);
    if (!response.ok) {
      throw new Error('Network response error')
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export const deleteOrder = (orderId) => {
  try {
    const response = fetch(`http://localhost:5001/orders/deleteOrder/${orderId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete order');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export async function updateOrder(orderId, orderQuantity) {
  fetch(`http://localhost:5001/orders/updateOrder/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify({
      orderId,
      orderQuantity
    }),
  })
  .then((response) => response.json())
  .catch( (error) => {
    console.log('Error Updating your Order :', error);
  })
}