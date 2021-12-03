const cartRouter = require("./routes/cart.js")
const userRouter = require("./routes/user.js")
const productsRouter = require("./routes/products.js")
const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use("/products", productsRouter)
app.use("/carts", cartRouter)
app.use("/users", userRouter)

app.get("/", (req, res) => {
  res.send()
})

module.exports = app
