
const express = require("express")
const router = express.Router()

const getDB = require("../../drivers/dbDriver")

router.get("/:userLogin", async (req, res) => {
  const db = await getDB()
  const userLogin = req.params.userLogin
  const order = await db.carts.getOne({ userLogin })
  res.send(order)
})

router.post("/:userLogin", async (req, res) => {
  const newOrder = req.body
  const userLogin = req.params.userLogin
  const db = await getDB()
  const orders = await db.carts.createOne({ userLogin, cart: newOrder })

  res
    .status(201)
    .send(orders.find((cart) => cart.userLogin === req.params.userLogin))
})

router.put("/:userLogin/:productId", async (req, res) => {
  const db = await getDB()
  const { userLogin, productId } = req.params
  const orders = await db.carts.modifyOrder({ userLogin, productId })

  res.send(orders.find((cart) => cart.userLogin === userLogin))
})

router.delete("/:userLogin/:productId", async (req, res) => {
  const db = await getDB()
  const { userLogin, productId } = req.params
  const orders = await db.carts.deleteOrder({ userLogin, productId })

  res.send(orders.find((cart) => cart.userLogin === userLogin))
})


module.exports = router;
