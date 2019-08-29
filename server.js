const express = require('express')
const app = express()
const connection = require("./connection")

app.get('/login', function (req, res) {
  connection.login(req.query)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
