const cartRouter = require("routes/cart")
const userRouter = require("routes/user")
const productsRouter = require("routes/products")

const express = require("express")
const app = express()

app.use("/cart", cartRouter)

app.get("/", (req, res) => {
  res.send()
})

module.exports = app
