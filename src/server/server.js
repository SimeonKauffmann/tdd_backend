const cartRouter = require('./routes/cart.js');
const userRouter = require('./routes/user.js');
const router = require('./routes/products.js');
const { mockdbDriver } = require('../drivers/mockdb');
const express = require('express');

const db = mockdbDriver();
const app = express(db);

app.use('/products', router);

app.get('/', (req, res) => {
  res.send();
});

module.exports = app;
