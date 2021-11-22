const expressDriver = require("../../src/server/server")
const request = require("supertest")
const app = expressDriver()

describe("server", () => {
  it("gets / ", (done) => {
    request(app)
      .get("/")
      .expect(200)
      .expect((res) => res.body === "oh hi!")
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
})
