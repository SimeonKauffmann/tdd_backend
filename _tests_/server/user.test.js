const app = require("../../src/server/server")
const request = require("supertest")

describe("User Test", () => {

  it('Get all /users', (done) => {
    request(app)
    .get('/users')
    .expect(200)
    .end((err, res) => {
      if (err) return done(err)
        return done()
    })
  })

  it('Get /users by specified login', (done) => {

    const loginID = "Patrik261"

    request(app)
    .get(`/users/${loginID}`)
    .expect(200)
    .expect((res) => {res.body.login = loginID})
    .end((err, res) => {
      if (err) return done(err)
        return done()
      })
  });

  it('Create a new array in /users', (done) => {
    const newUser = { login: "Kevin69", name: "Kevin Andersson"}

    request(app)
    .post("/users")
    .send(newUser)
    .expect(201)
    .expect((res) => res.body.find(user => user.login === "Kevin69"))
    .end((err, res) => {
      if (err) return done(err);
      return done()
    })
  });

  it('Delete created array in /users', (done) => {

    const loginID = "Kevin69"

    request(app)
    .delete(`/users/${loginID}`)
    .expect(501)
    .end((err, res) => {
      if (err) return done(err);
      return done()
    })
  });

  // it('Check deleted User', async () => {

  // });

  // it('GET User by false ID', async () => {})



})