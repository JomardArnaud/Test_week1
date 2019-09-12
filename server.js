const express = require('express')
const app = express()
const mysql = require('mysql')
const bdd = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "oppai8",
  database: "real_test",
  port: "3308"
});
const route = require("./route")(app, bdd)

//ITEM PART
/*  req.filter to set the field for research, exemple if you want find item by name req.filter = "name"
    req.where to set value for the field exemple if you want the item of john req.where = "John"
    the result of request will be store on res.item
*/

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
