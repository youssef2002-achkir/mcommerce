const express = require('express');
const cors = require('cors');
const connectToDB = require('./database/connectToDB')
const newPaymentRouter = require('./routes/newPayment');

const port = process.env.PORT || 5002;
const bodyParser = require('body-parser');

const app = express();

connectToDB()
  .then(() => {
    console.log('DB CONNECTION ESTABLISHED');
  })
  .catch((err) => {
    console.log('ERROR IN DB CONNECTION', err);
    process.exit(1);
  });
app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cors());
app.use('/payments', newPaymentRouter);
app.listen(port, () => {
    console.log(`server lestening on port${port}`)
})