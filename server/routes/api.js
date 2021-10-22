const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const { Client, Connection } = require('pg')

const client = new Client({
 user: 'postgres',
 host: 'localhost',
 password: 'Postgre',
 database: 'TP5'
})

client.connect()

/**
 * Route permettant de connecter un utilisateur
 */
router.post('/login', (req, res) => {

  const email = req.body.email
  const password = req.body.password

  login(req, res, email, password)
})

async function login(req, res, email, password) {
  const sqlLoginUser = await client.query({
    text: "SELECT id, password FROM users WHERE email=$1",
    values: [email]
  })

  if(sqlLoginUser.rowCount == 1) {
    if(await bcrypt.compare(password, sqlLoginUser.rows[0].password)) {
      if(req.session.userId == undefined) {
        req.session.userId = sqlLoginUser.rows[0].id
        req.session.email = email
        res.json({ message: 'Logged in' })
      }
      else {
        res.status(401).json({ message: 'User already connected' })
      }
    }
    else {
      res.status(401).json({ message: 'Password incorrect' })
    }
  }
  else {
    res.status(401).json({ message: "User don't exist" })
  }
}

module.exports = router
