//Load dependecies
var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

//Sync with MySQL db
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // My username
    user: "root",

    // My password
    password: "",
    database: "bamazon_db"
});

//Connect to database
connection.connect(function(err) {
    if (err) throw err;
});

//ClI Questions for user
var questions = inquirer.prompt([{
    name: "productId",
    type: "input",
    message: "What is the ID of the product you would like to buy?",
    validate: function(value) {
        if (isNaN(value) === false) {
            return true;
        }
        return "Please enter numbers only.";
    }
}, {
    name: "quantity",
    type: "input",
    message: "How many units of the product would you like to buy?",
    validate: function(value) {
        if (isNaN(value) === false) {
            return true;
        }
        return "Please enter numbers only.";
    }
}]).then(function(answer) {
    //connect to the mySQL database and run this query below (shows info of product data based on user input)
    connection.query("SELECT product_name, price, stock_quantity from products WHERE item_id = ?", [answer.productId], function(err, res) {
        if (err) throw err;
        //Check to see if we have enough qty.
        var newQuantity = res[0].stock_quantity - answer.quantity;
        var totalCost = res[0].price * answer.quantity;
        if (parseInt(res[0].stock_quantity) > answer.quantity) {
            //Update the database with the new quantity
            connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newQuantity, answer.productId], function(err, res) {
                if (err) throw err;
            });
            //Sends the user  message confirming the order when sufficient qty. in stock
            console.log('\nSucess, your order has been processed! \nWe had enough stock and you have purchased ' + answer.quantity + " orders of " + res[0].product_name + ' for $ ' + res[0].price + " each. Your total is $" + totalCost + "\n\nBamazon Quadcopter Drones are on their way flying your order to you now. Keep your Windows open!");
            //Notify user that we don't have their deisred qty.
        } else if (newQuantity === 0 || newQuantity < res[0].stock_quantity) {
            console.log("Gosh sorry, we don't have enough stock to fulfill your order.");
        }
    });
});
