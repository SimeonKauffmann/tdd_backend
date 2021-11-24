const express = require('express');
const router = express.Router();

const getDB = require('../../drivers/mockdb').getDB;

router.get('/:id', async (req, res) => {
  const db = await getDB();
  const productId = req.params.id;
  const order = await db.products.getOne({ productId });
  res.send(order);
});

router.post('/', async (req, res) => {
  const db = await getDB();
  await db.products.createOneProduct(req.body);
  res.status(201).send(req.body);
});

router.put('/', async (req, res) => {
  const db = await getDB();
  const updatedProduct = req.body;
  await db.products.modifyProduct({ updatedProduct });
  res.send(updatedProduct);
});

module.exports = router;
