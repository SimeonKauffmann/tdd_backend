const express = require("express");
const getDB   = require('../../drivers/mockdb.js').mockdbDriver
const router  = express.Router();

// GET ALL
router.get('/', async (req, res) => {
  const db = await getDB();
  try {
    const users = await db.users.getAll();
    res.send(users);
    
  } catch (err) {
    console.error('Error GET /users', err);
    res.status(501).send(err);
  }
});

// GET ONE SPECIFIE
router.get("/:login", async (req, res) => {

  const login = req.params.login;
  const db = await getDB();

  try {
    const user = await db.users.getOne({userLogin: login});
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST
router.post("/", async (req, res) => {

  const {login, name} = req.body;
  const db = await getDB();

  try {
    const newUser = await db.users.createOne({login, name})
    res.status(201).send(newUser)
  } catch (err) {
    res.status(501).send(err)
  }
});

// DELETE
router.delete('/:login', async (req, res) => {

  const login = req.params.login;
  const db = await getDB();

  try {
    const deleUser= await db.users.deleteOne({login: login })
    res.status(201).send(deleUser)
  } catch (err) {
    res.status(501).send(err);
  }
});

module.exports = router
