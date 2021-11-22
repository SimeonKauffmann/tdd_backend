const expressDriver = require("../../src/server/server").expressDriver
const request = require("supertest")
const app = expressDriver()

// GET
// /api/carts/:userLogin

describe("GET /carts", () => {
  it("gets /carts/secret ", (done) => {
    request(app)
      .get("/carts/secret")
      .expect(200)
      .expect((res) => res.body.cart[0].productId === "66ed22217e81")
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })

  // /api/carts/-emptystring-

  it("throws error (400) /carts/ ", (done) => {
    request(app)
      .get("/carts/")
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
  // /api/carts/unknown-user

  it("throws error (400) /carts/unkown-user ", (done) => {
    request(app)
      .get("/carts/unkown-user")
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
})

// POST
// /api/carts/:userLogin

describe("POST /carts", () => {
  it("posts /carts/:userLogin ", (done) => {
    request(app)
      .post("/carts/something")
      .send([{ productId: "66ed22217e82", amount: 13 }])
      .expect(201)
      .expect((res) => res.body.cart[0].productId === "66ed22217e82")
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
})

// PUT
// /api/carts/:userLogin/:itemId

describe("PUT product in cart", () => {
  it("puts a product in cart /carts/:userLogin/productId ", (done) => {
    request(app)
      .put("/carts/secret/66ed22217e82")
      .expect(200)
      .expect((res) =>
        res.body.cart.find((product) => product.productId === "66ed22217e82")
      )
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
})

// DELETE
// /api/carts/:userLogin/:itemId

describe("DELETE product in cart", () => {
  it("deletes product in cart /carts/:userLogin/productId ", (done) => {
    request(app)
      .delete("/carts/secret/66ed22217e83")
      .expect(200)
      .expect(
        (res) =>
          res.body.cart.find(
            (product) => product.productId === "66ed22217e83"
          ) === undefined
      )
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
})
