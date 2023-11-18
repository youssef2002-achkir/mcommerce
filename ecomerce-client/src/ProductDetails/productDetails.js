import React, { useState, useEffect } from 'react';
import './productDetails.css'; // Import your CSS file
import { createOrder } from '../api/order-service';
import { deleteOrder } from '../api/order-service';
import { updateOrder } from '../api/order-service';
import AddPayment from '../AddPayment/addPayment';

function ProductDetails({ product, order }) {
  

  const [orderQuantity, setOrderQuantity] = useState(null); // State to capture order quantity
  const [orders, setOrders] = useState([]);
  const [isDivVisible, setDivVisibility] = useState(false);
  useEffect( () => {
    console.log('hi');
    setOrders(order);

    
    
    console.log(orders);
  }, [order])

  const isEmpty = orders.length === 0 ? false : true;
  const handleOrderClick = () => {
    const quantity = window.prompt('Specify the order quantity:', orderQuantity);
    
    if (quantity !== null) {
      // Ensure quantity is a positive integer
      const parsedQuantity = parseInt(quantity, 10);
      if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
        setOrderQuantity(parsedQuantity);

        // Create the order (Step 3)
        createOrder(product._id, parsedQuantity);
      }
    }
  };

  const handleUpdateOrder = (orderId, newQuantity) => {
    const updatedQuantity = window.prompt('Modify Order quantity', newQuantity);
    if (updatedQuantity !== null) {
      // Ensure quantity is a positive integer
      const parsedQuantity = parseInt(updatedQuantity, 10);
      if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
        setOrderQuantity(parsedQuantity);
        console.log(parsedQuantity);
        updateOrder(orderId, parsedQuantity);
  }
    }
  }
  const showoOrders = () => {
    setDivVisibility(!isDivVisible);
  }

  const handleDeleteOrder =  (orderId) => {
    try {
      deleteOrder(orderId);
      setOrders(order.filter((order) => order.id !== orderId));
      // Handle successful deletion (e.g., update state, show a success message)
    } catch (error) {
      // Handle error (e.g., display an error message)
    }
  };
 
  function formatDate(dateString) {
    // Convert the date string to a JavaScript Date object
    const date = new Date(dateString);
  
    // Format options
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, // Use 12-hour time format
    };
  
    // Format the date using the options
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  
    return formattedDate;
  }

  return (
    <div className="product-details">
      <h2 className="product-title">{product.title}</h2>
      <div className="product-description">{product.description}</div>
      <div className="product-price">${product.price}</div>
      <img className="product-image" src={product.image} alt={product.title} />
      <div className='product-buttons'>
      <button onClick={handleOrderClick} disabled={isEmpty}>New Order</button>
      <button onClick={showoOrders} disabled={!isEmpty}>Show Orders</button>
      </div>
      
      {isDivVisible && 
      <div>
        <h2>Orders For {product.title}</h2>
        {orders.map( (orde) => {
          return(
            <div className='order-details'>
             <h2 className="product-title">Order Identifier : {orde._id}</h2>
             <div className="product-description">Product Identifier : {orde.productId}</div>
             Payment Status: {orde.paymentStatus ? 'Paid' : 'Pending'}
             <div className="product-price">Entities : {orde.orderQuantity}</div>
             <div className="product-description">Order Date : {formatDate(orde.orderDate)}</div>
             <div className='product-buttons'>
                <button onClick={() => {handleDeleteOrder(orde._id)}}>Delete</button>
                <button onClick={() => {handleUpdateOrder(orde._id, orde.orderQuantity)}} disabled={orde.paymentStatus}>Update</button>

                <AddPayment 
                 orderIdentifier={orde._id}
                 rising={product.price * orde.orderQuantity}
                 isPaid={orde.paymentStatus}
                 />
             </div>
            </div>
          ) 
        })}
        </div>
      }
     
    </div>
  );
}

export default ProductDetails;
