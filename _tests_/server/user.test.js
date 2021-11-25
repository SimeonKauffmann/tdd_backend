const app = require("../../src/server/server")
const request = require("supertest")

describe("Test User GET/POST/DELETE", () => {
  // Check GET/getAll
  it("Get all /users", (done) => {
    request(app)
      .get("/users")
      .expect(200)
      .expect((res) => res.body.lenght === 3)
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })

  // Check GET/getOne
  it("Get /users by specified login", (done) => {
    const loginID = "Patrik261"

    request(app)
      .get(`/users/${loginID}`)
      .expect(200)
      .expect((res) => {
        res.body.userLogin = loginID
      })
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })

  // Check POST/createOne
  it("Create a new array in /users", (done) => {
    const newUser = { login: "Kevin69", name: "Kevin Andersson" }

    request(app)
      .post("/users")
      .send(newUser)
      .expect(201)
      .expect((res) => res.body.find((user) => user.userLogin === "Kevin69"))
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })

  // Check DELETE/deleteOne
  it("Delete created array in /users", (done) => {
    const loginID = "Kevin69"

    // The Request success but Error Code 501
    request(app)
      .delete(`/users/${loginID}`)
      .expect(200)
      .expect((res) => res.body.find((user) => user.userLogin !== "Kevin69"))
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })
  })
})

describe("Test User with Error", () => {
  // Throw error with invaild userLogin
  it("Send invaild userLogin for GET request", (done) => {
    request(app)
      .get(`/users/UnknownTest`)
      .expect(403)
      .expect((res) => res.body === "Invaild User")
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })

    // POST
    // Empty array? One or Both missing.
    // Can't Create loginId if existing

    it("should create", (done) => {
      const emptyUser = { login: "", name: "" }
      request(app)
      .post("/users")
      .send(emptyUser)
      .expect(201)
      .expect((res) => res.body === "Missing object")
      .end((err, res) => {
        if (err) return done(err)
        return done()
      })

    })


  })
})
