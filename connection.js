const ctrl = module.exports;
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "oppai8", //je suis pas sur de vouloir push ça xD
  database: "MySQL80"
});

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM users", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });

ctrl.login = function(request) {
    con.connect();
    compareLoginStuff(request.login, request.password);
}

function compareLoginStuff(login, password) {
    loginStuffUser= getLoginStuff();
    for(let i=0; i < loginStuffUser.User.length;i++) {
        if (login == loginStuffUser.User[i].login) {
            if (password == loginStuffUser.User[i].password) {
                console.log("connection sucess");
                return (0);
            }
        }
    }
    console.log("login or password might be wrong");
    return (-1);
}

function getLoginStuff() {
    //will be request SQL
    var jsonLoginTmp = JSON.parse('{ "User" : [' +
            '{ "login":"root1" , "password":"root1"},' +
            '{ "login":"root2" , "password":"root2"},' +
            '{ "login":"root3" , "password":"root3"} ]}');
    return (jsonLoginTmp);
}