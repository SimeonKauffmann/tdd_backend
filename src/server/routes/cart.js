const express = require("express")
const router = express.Router()

const data = require("../../db/dbDriver").cartsData

router.get("/:userLogin", (req, res) => {
  const order = data.find(
    (cart) => cart.user.userLogin === req.params.userLogin
  )
  res.send(order.cart)
})

router.post("/:userLogin", (req, res) => {
  const newOrder = req.body

  data.push({ user: { userLogin: req.params.userLogin }, cart: newOrder })

  res
    .status(201)
    .send(data.find((cart) => cart.user.userLogin === req.params.userLogin))
})

router.put("/:userLogin/:productId", (req, res) => {
  data.forEach((cart) => {
    if (cart.user.userLogin === req.params.userLogin) {
      if (
        cart.cart.find((product) => {
          product.productId === req.params.productId
        })
      ) {
        cart.cart.indexOf(product.productId === req.params.productId).product
          .amount++
      } else {
        cart.cart.push({ productId: req.params.productId, amount: 1 })
      }
    }
  })

  res.send(data.find((cart) => cart.user.userLogin === req.params.userLogin))
})

module.exports = router
