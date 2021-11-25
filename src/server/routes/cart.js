const express = require("express")
const router = express.Router()

const getDB = require("../../drivers/mockdb").getDB

router.get("/:userLogin", async (req, res) => {
  const db = await getDB()
  const userLogin = req.params.userLogin
  const findUser = await db.users.getOne({ userLogin })

  if (!findUser) {
    res.status(401).send("Unknown User")
  }

  const order = await db.carts.getOne({ userLogin })
  res.send(order)
})

router.post("/:userLogin", async (req, res) => {
  const newOrder = req.body
  const userLogin = req.params.userLogin
  const db = await getDB()

  const badProducts = newOrder.filter((product) => {
    return !(
      product.hasOwnProperty("productId") &&
      product.hasOwnProperty("amount") &&
      Object.keys(product).length === 2
    )
  })

  if (!!badProducts[0]) {
    res.status(400).send(`Bad products: ${badProducts}`)
  } else {
    const orders = await db.carts.createOne({ userLogin, cart: newOrder })

    res.status(201).send(orders.find((cart) => cart.userLogin === userLogin))
  }
})

router.put("/:userLogin/:productId", async (req, res) => {
  const db = await getDB()
  const { userLogin, productId } = req.params
  const findProduct = await db.products.getOne(productId)
  const findUser = await db.users.getOne({ userLogin })

  if (!findProduct) {
    res.status(400).send("Unknown Product")
  } else if (!findUser) {
    res.status(401).send("Unknown User")
  } else {
    const orders = await db.carts.modifyOrder({ userLogin, productId })

    res.send(orders.find((cart) => cart.userLogin === userLogin))
  }
})

router.delete("/:userLogin/:productId", async (req, res) => {
  const db = await getDB()
  const { userLogin, productId } = req.params
  const findUser = await db.users.getOne({ userLogin })
  const findProduct = await db.products.getOne(productId)

  if (!findProduct) {
    res.status(400).send("Unknown Product")
  } else if (!findUser) {
    res.status(401).send("Unknown User")
  } else {
    const orders = await db.carts.deleteOrder({ userLogin, productId })

    res.send(orders.find((cart) => cart.userLogin === userLogin))
  }
})

module.exports = router
