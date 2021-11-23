const app = require("../../src/server/server")
const request = require("supertest")

describe("server", () => {
  it("gets / ", (done) => {
    request(app)
      .get("/")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
})
