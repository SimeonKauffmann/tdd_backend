const cartRouter = require("./routes/cart.js")
const userRouter = require("./routes/user.js")
const productsRouter = require("./routes/products.js")
const mockdbDriver = require("../drivers/mockdb")
const express = require("express")

// const db = mockdbDriver();
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/products", productsRouter)
app.use("/carts", cartRouter)

app.get("/", (req, res) => {
  res.send()
})

module.exports = app
