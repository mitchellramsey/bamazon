//Dependencies
var mysql = require("mysql");
var colors = require('colors');
var inquirer = require('inquirer');
var customer = require('./bamazonCustomer.js');
var manager = require('./bamazonManager.js');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    //My username
    user: "root",

    //My password
    password: "root",
    database: "bamazon_DB"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("connected as id " + connection.threadId+ "\n");

    
    
    userDirection();
    


    // connection.end();

   
});

function userDirection() {
    inquirer.prompt({
        type: "rawlist",
        name: "appChoice",
        message: "Welcome to Bamazon! Which site are you trying to reach?",
        choices: ["customer", "manager"]
    }).then(function(answer) {
        if(answer.appChoice === "customer"){
            customer.customerApp();
        }else {
            manager.managerApp();
        }
    });

    connection.end();
}