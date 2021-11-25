const app = require('../../src/server/server');
const request = require('supertest');

// GET
// /api/carts/:userLogin

describe('GET /carts', () => {
  it('gets /carts/:userLogin ', (done) => {
    request(app)
      .get('/carts/secret')
      .expect(200)
      .expect((res) => res.body.cart[0].productId === '66ed22217e81')
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })

  // /api/carts/unknown-user

  it("Recieves 401 /carts/unknown-user ", (done) => {
    request(app)
      .get("/carts/unknown-user")
      .expect(401)
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
})


// POST
// /api/carts/:userLogin/

describe('POST /carts', () => {
  it('posts /carts/:userLogin ', (done) => {
    request(app)
      .post('/carts/something')
      .send([{ productId: '66ed22217e82', amount: 13 }])
      .expect(201)
      .expect((res) => res.body.cart[0].productId === '66ed22217e82')
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })

  // /api/carts with bad product

  it("Recieves 400 with bad product object", (done) => {
    request(app)
      .post("/carts/something")
      .send([{ id: "66ed22217e82", amount: 1 }]) // id instead of productId
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
})

// PUT
// /api/carts/:userLogin/:itemId
describe("PUT product in cart", () => {
  it("puts a product in cart /carts/:userLogin/:productId ", (done) => {

    request(app)
      .put('/carts/secret/66ed22217e82')
      .expect(200)
      .expect((res) =>
        res.body.cart.find((product) => product.productId === '66ed22217e82')
      )
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })

  // /api/carts with product that doesn't exist

  it("puts a product in cart /carts/:userLogin/:productId ", (done) => {
    request(app)
      .put("/carts/secret/fakeProduct")
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
})


// DELETE
// /api/carts/:userLogin/:itemId

describe("DELETE product in cart", () => {
  it("deletes product in cart /carts/:userLogin/:productId ", (done) => {

    request(app)
      .delete('/carts/secret/66ed22217e83')
      .expect(200)
      .expect(
        (res) =>
          res.body.cart.find(
            (product) => product.productId === '66ed22217e83'
          ) === undefined
      )
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })

  it("Recieves 400 when attempting to delete a non-existent product", (done) => {
    request(app)
      .delete("/carts/secret/fakeProduct")
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
})

