const cartRouter = require("./routes/cart.js")
const usersRouter = require("./routes/user.js")
const productsRouter = require("./routes/products.js")
const mockdbDriver = require("../drivers/mockdb").mockdbDriver
const express = require("express")

let getDB


const expressDriver = (db) => {
  getDB = db
  const app = express()
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  app.use("/products", productsRouter)
  app.use("/carts", cartRouter)
  app.use("/users", usersRouter)

  app.get("/", (req, res) => {
    res.send("oh hi!")
  })
  return app
}

module.exports = { expressDriver, getDB }
