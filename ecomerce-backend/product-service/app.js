const express = require('express');
const app = express();
const cors = require('cors'); 
const port = process.env.PORT || 5000;
const connectionDB = require('./database/dbConnection');
const createProductRouter = require('./routes/createProduct');
const getAllProductsRouter = require('./routes/getAllProducts');
const getProductByIdRouter = require('./routes/getProductById');
const updateProductRouter = require('./routes/updateProduct');
const deleteProductRouter = require('./routes/deleteProduct');


connectionDB()
  .then(() => {
    console.log('DB CONNECTION ESTABLISHED');
  })
  .catch((err) => {
    console.log('ERROR IN DB CONNECTION', err);
    process.exit(1);
  });
app.use(cors())
app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true })); 
app.use('/products', createProductRouter);
app.use('/products', getAllProductsRouter);
app.use('/products', getProductByIdRouter);
app.use('/products', updateProductRouter);
app.use('/products', deleteProductRouter);

app.listen(port, () => {
    console.log("hello from me other side!!")
})