var mysql = require('mysql');
const ctrl = module.exports;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", //je suis pas sur de vouloir push ça xD
  database: "user_scheama",
  port: "3308"
});

/*
à remettre après dans le server.js
app.get('/login', function (req, res) {
  connection.login(req.query)
})

app.get ('/addUser', function(req, res) {
  connection.addUser(req.query)
})

app.get('/changePassword', function(req, res) {
  connection.changePassword(req.query)
}) */

ctrl.login = function(request) {
    con.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        result.forEach(element => {
            if (request.Login == element.Login) {
                if (request.Password == element.Password) {
                    console.log("connection sucess");
                    return (0);
                }
            }
        });
        console.log("login or password might be wrong");
        return (-1);
    });
}

ctrl.addUser = function(request) {
    if (isLoginValid(request.Login)) {
        if (isPasswordValid(request.Password)) {
            con.query("INSERT INTO users (Login, Password) VALUE('" + request.Login + "', '" + request.Password + "');", function (err, result, fields) {
                if (err) throw err;
            });
        } else {
            console.log("Password isn't valid"); //ce message sera dans isPasswordValid pour la traçabilité de l'erreur    
        }
    } else {
        console.log("Login isn't valid"); //ce message sera dans isLoginValid pour la traçabilité de l'erreur
    }
}

ctrl.changePassword = function(request) {
    if (isPasswordValid(request.Password)) {
        //Comme ça fait pas d'erreur quand il ne trouve pas de Login il faut l'handle à la main
        con.query("UPDATE users SET Password='" + request.Password + "' WHERE Login='" + request.Login + "';", function (err, result, fields) {
            if (err) throw err;
        });
    } else {
        console.log("Password isn't valid"); //ce message sera dans isPasswordValid pour la traçabilité de l'erreur
    }
}

function isLoginValid(login) {
    // LIST CHECK WHO ARE NEEDED
    //check if the login is use
    return true;
}
function isPasswordValid(password) {
    return true;
}