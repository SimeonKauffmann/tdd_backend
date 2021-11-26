const express = require('express');
const router = express.Router();
const { isValidProduct } = require('../../validation/validation');

const getDB = require('../../drivers/mockdb').getDB;

router.get('/', async (req, res) => {
  const db = await getDB();
  try {
    const products = await db.products.getAll();
    res.send(products);
  } catch (err) {
    console.error('Error GET /products', err);
    res.status(501).send(err);
  }
});

router.get('/:id', async (req, res) => {
  const db = await getDB();
  const productId = req.params.id;
  const order = await db.products.getOne({ productId });
  res.send(order);
});

router.post('/', async (req, res) => {
  const db = await getDB();
  const data = req.body;
  if (!isValidProduct(data)) {
    res.status(400).send(`Invalid input: ${data}`);
  } else {
    const product = await db.products.createOneProduct(data);
    res.status(201).send(product.find((item) => item.id === data.id));
  }
});

router.put('/', async (req, res) => {
  const data = req.body;
  if (!isValidProduct(data)) {
    res.status(400).send(`Invalid input: ${data}`);
  } else {
    const db = await getDB();
    const product = await db.products.modifyProduct(data);
    res.status(200).send(product.find((item) => item.id === data.id));
  }
});

router.delete('/', async (req, res) => {
  const db = await getDB();
  const inputId = req.params;
  const findProduct = await db.products.getOne(inputId);

  if (!findProduct) {
    res.status(400).send('Unknown Product');
  } else {
    const products = await db.products.deleteProduct(inputId);
    res.send(products);
  }
});

module.exports = router;
