var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "mummas",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
});


connection.query("SELECT * FROM products WHERE department_name=?", ["Home Goods"], function(err, res) {
    for (var i = 0; i < res.length; i++) {
        console.log(res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
});
