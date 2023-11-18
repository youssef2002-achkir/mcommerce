const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5001;
const connectToDB = require('./database/dbConnection');
const newOrderRouter = require('./routes/newOrder');
const getOrderByIdRouter = require('./routes/getOrderById');
const getAllOrdersRouter = require('./routes/getAllOrders');
const deleteOrderRouter = require('./routes/deleteOrder');
const updateOrerRouter = require('./routes/updateOrder');

const app = express();

connectToDB()
  .then( () => {
    console.log('CONNECTION TO DB ESTABLISHED');
  })
  .catch( (err) => {
    console.log('CONNECTION TO DB FAILED:', err);
  });

app.use(express.json());
app.use(cors());
app.use('/orders', newOrderRouter);
app.use('/orders', getOrderByIdRouter);
app.use('/orders', getAllOrdersRouter);
app.use('/orders', deleteOrderRouter);
app.use('/orders', updateOrerRouter);

app.listen(port, () => {
    console.log(`listening to port ${port}`);
})