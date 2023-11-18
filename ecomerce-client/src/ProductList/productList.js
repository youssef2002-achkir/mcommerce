import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/product_service';
import { getAllOrders } from '../api/order-service';
import ProductDetails from '../ProductDetails/productDetails';
import './productList.css'

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [Orders, setOrders] = useState([]);
  const [selectedProductOrders, setSelectedProductOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });

      getAllOrders()
        .then((data) => {
          setOrders(data);
        })
        .catch((error) => {
          throw Error(error);
        })
  }, []);

  const handleProductClick = (product, productId) => {
    setSelectedProduct(product);
    const myOrders = [];
    Orders.map((order) => {
      if( order.productId == productId) {
        myOrders.push(order);
      }
      console.log(myOrders);
      setSelectedProductOrders(myOrders)
    })
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
  };


  return (
    // <ul>
    //   {products.map((product) => (
    //     <li key={product._id}>{product.title}</li>
    //   ))}
    // </ul>
    <div className="App">
      
      {selectedProduct ? (
        <div>
          <h1 style={{ color: "green" }}>Product Details</h1>
          <ProductDetails product={selectedProduct} order={selectedProductOrders}/>
          <button onClick={handleBackToList} className='close-button'>Close</button>
        </div>
      ) : (
        <div>
          <h1 style={{ color: "green" }}>Products List</h1>
          <center
      style={{
        columnCount: 4
      }}>
        {products.map((product) => {
          return (
            <div
              style={{
                width: "15em",
                backgroundColor: "#35D841",
                padding: 2,
                borderRadius: 10,
                marginBlock: 10,
              }}
            >
              <p key={product._id} style={{ fontSize: 20, color: 'white', cursor: 'pointer' }} onClick={() => handleProductClick(product, product._id)}>{product.title}</p>
              <img src={product.image} style={{width: '200px', height: '200px'}}></img>
              
            </div>
          );
        })}
      </center>
        </div>
      
      )}
      
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  ); 
}

export default ProductList;
