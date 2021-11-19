const expressDriver = require("./src/server/server.js").expressDriver

const app = expressDriver()

app.listen(3000, (err) => {
  if (err) console.error("Error att app.listen: ", err)
  console.log("app listening at localhost:3000")
})
