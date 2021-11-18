const express = require('express');
const { getDB } = require('../../drivers/mockdb.js');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const db = await getDB();

  try {
    const product = await db.products.getOne({ _id: id });
    res.send(product);
  } catch (err) {
    console.error('ERROR: ', err);
    res.status(501).send(err);
  }
});

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

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const db = await getDB();
  try {
    const response = await db.products.deleteOne({ _id: ObjectId(id) });
    console.log('deleted one');
    res.send('deleted one');
  } catch (err) {
    console.error(err);
    res.status(501).send(err);
  }
});

router.post('/', async (req, res) => {
  const { name, cost, amount } = req.body;
  const db = await getDB();

  try {
    const response = await db.products.createOne({ name, cost, amount });
    console.log(`succeful insert of Product`);
    res.status(201).send(`succeful insert of Product`);
  } catch (err) {
    console.error(err);
    res.status(501).send(err);
  }
});

module.exports = router;

// const express = require("express")
// const router = express.router()

// router.get("/", (req, res) => {
//   res.send()
// })

// module.exports = router
