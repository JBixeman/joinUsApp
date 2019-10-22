const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'test_account',
    database : 'join_us',
    password : ''
  });

app.get("/", function (req, res){
    var q = ("SELECT COUNT(*) as count FROM users; ");
    connection.query(q, function(err, results){
        if(err) throw err;
        var count = results[0].count;
        res.render("home", {data: count});
    });
    });


app.post("/register", function(req, res) {
    var person = {
        email: req.body.email
    };
    
    connection.query('INSERT INTO users SET ?', person, function(err, result){
        if (err) throw err;
        console.log(result);
        });
    });



app.listen(PORT, () => 
    console.log(`Server is running on PORT: ${PORT}`)
);





