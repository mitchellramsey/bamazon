//Dependencies
var mysql = require("mysql");
var colors = require('colors');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    //My username
    user: "root",

    //My password
    password: "root",
    database: "bamazon_DB"
});

// connection.connect(function(err) {
//     if(err) throw err;
//     console.log("connected as id " + connection.threadId+ "\n");

       
   
//     managerApp();
// });

var incorrectTries = 0;

function managerApp() {
    inquirer.prompt({
        type: "password",
        name: "managerPW",
        message: "Welcome to the Bamazon Manager App. Please enter the correct password."
    }).then(function(answer){
        if(answer.managerPW === "manager"){
            managerStartScreen();
        }else {
            console.log("That is incorrect. Please try again");
            incorrectTries++;
            if(incorrectTries === 3){
                console.log("You have too many incorrect attempts and are now locked out. Please try again later!");
                connection.end();
            }else{
                managerApp();
            }

        }
    });
}

function managerStartScreen() {
    console.log("Welcome Manager")
            inquirer.prompt({
                type: "rawlist",
                name:"managerChoice",
                message:"What would you like to do?",
                choices: ["View Products For Sale", "View Low Inventory", "Add to Inventory"]
            }).then(function(answer) {
                switch(answer.managerChoice) {
                    case "View Products For Sale":
                        viewProducts();
                        break;
                    case "View Low Inventory":
                        viewLowInventory();
                        break;
                    case "Add to Inventory":
                        addInventory();
                        break;
                }
            });
}

function viewProducts() {
    connection.query("SELECT * FROM products", function(err,res){
        if(err) throw err;
        // console.log(res);
        for(var i = 0; i < res.length; i++){
            console.log(`ID: ${res[i].item_id}, Product: ${res[i].product_name}, Department: ${res[i].department_name}, Price: ${res[i].price}, Stock: ${res[i].stock_quantity}`+ "\n");
        }
        inquirer.prompt({
            type: "confirm",
            name: "newTask",
            message: "Would you like to do something else?",
            default: true
        }).then(function(answer) {
            if(answer.newTask){
                managerStartScreen();
            }else{
                console.log("\nThank you for logging out! Have a good day!");
                connection.end();
            }
        });
    });
}

function viewLowInventory() {
    var query = "SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5";
    connection.query(query, function(err,res) {
        // console.log(res);
        for(var i = 0; i < res.length; i++){
            console.log(`ID: ${res[i].item_id}, Product: ${res[i].product_name}, Stock: ${res[i].stock_quantity}` + "\n");
        }
        inquirer.prompt({
            type: "confirm",
            name: "newTask",
            message: "Would you like to do something else?",
            default: true
        }).then(function(answer) {
            if(answer.newTask){
                managerStartScreen();
            }else{
                console.log("\nThank you for logging out! Have a good day!");
                connection.end();
            }
        });
    });
}

function addInventory() {
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Type in the Item ID of the item you would like to order."
        },
        {
            type: "input",
            name: "quantity",
            message: "What would you like the new quantity number to be? "
        }
    ]).then(function(answer) {
        var id = parseInt(answer.id);
        var quantity = parseInt(answer.quantity);
        var query = "UPDATE products SET ? WHERE ?";
        connection.query(query, 
        [
            {
                stock_quantity: quantity
            },
            {
                item_id: id
            }
        ], function(err,res){
            if(err) throw err;
            console.log("You have updated " + res.affectedRows + " rows.\n");
        });
        inquirer.prompt({
            type: "confirm",
            name: "newTask",
            message: "Would you like to do something else?",
            default: true
        }).then(function(answer) {
            if(answer.newTask){
                managerStartScreen();
            }else{
                console.log("\nThank you for logging out! Have a good day!");
                connection.end();
            }
        });
    });
}

module.exports.managerApp = managerApp;