const express = require('express');
const router = express.Router();
const { isValidProduct } = require('../../validation/validation');

const getDB = require('../../drivers/mockdb').getDB;

router.get('/:id', async (req, res) => {
  const db = await getDB();
  const productId = req.params.id;
  const order = await db.products.getOne({ productId });
  res.send(order);
});

router.post('/', async (req, res) => {
  const data = req.body;
  if (!isValidProduct(data)) {
    throw new Error('Invalid product object');
  }
  if (data.price < 0) {
    throw new Error("Price can't be below zero");
  }
  const db = await getDB();
  await db.products.createOneProduct(req.body);
  res.status(201).send('Success');
});

router.put('/', async (req, res) => {
  const db = await getDB();
  const updatedProduct = req.body;
  await db.products.modifyProduct({ updatedProduct });
  res.send(updatedProduct);
});

module.exports = router;
