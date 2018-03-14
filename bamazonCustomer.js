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

       
       

//     // customerApp();
// });


function idToResId(id) {
    var resId = 0;
    if(id === 1 || id === 5 || id === 9 || id === 13) {
        resId = 0;
        return resId;
    } else if(id === 2 || id === 6 || id === 10 || id === 14) {
        resId = 1;
        return resId;
    } else if(id === 3 || id === 7 || id === 11 || id === 15) {
        resId = 2;
        return resId;
    } else if(id === 4 || id === 8 || id === 12 || id === 16) {
        resId = 3;
        return resId;
    }
}

function customerApp() {
    console.log("Welcome to Bamazon! The best place to shop for top selling movies, books, games, and music!\n".green);
    var departments = [];
    connection.query("SELECT DISTINCT department_name FROM products", function(err,res) {
        for(var i=0; i<res.length; i++){
            departments.push(res[i].department_name);
        }
        // console.log(departments);
        inquirer
            .prompt({
                name: "departmentChoice",
                type: "rawlist",
                message: "Which department do you want to shop in today?",
                choices: departments
            }).then(function(answer) {
                var query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE ?";
                connection.query(query,{department_name: answer.departmentChoice}, function(err,res) {
                    if(err) throw err;
                    var items = [];
                    for(var j=0; j<res.length; j++){
                        items.push(`ID: ${res[j].item_id}, ${res[j].product_name}, Price: $${res[j].price}, Stock: ${res[j].stock_quantity}`);
                    }
                    console.log("Here are the following items in this department: \n".yellow);
                    for(var i=0;i<items.length;i++){
                        console.log(items[i]);
                    }
                    inquirer
                      .prompt([
                          {
                              name: "itemId",
                              type: "input",
                              message: "Enter the Item Id of the item you want to purchase."
                          },
                          {
                              name: "quantity",
                              type: "input",
                              message: "How many would you like to buy?"
                          }
                      ]).then(function(answer) {
                        //   console.log(answer);
                        //   console.log(res);
                          
                          var id = parseInt(answer.itemId);
                          var quantity = parseInt(answer.quantity);
                        //   console.log(id);
                        //   console.log(typeof id);
                        //   console.log(res[id]);
                          var resId = idToResId(id);
                        //   console.log(resId);
                        //   console.log(res[resId]);
                        //   console.log(validator.isInt(answer.itemId));
                          if(quantity < res[resId].stock_quantity){
                            //   console.log(answer.quantity)
                              connection.query("SELECT price FROM products WHERE ?", {item_id: id}, function(err, res){
                                  if(err) throw err;
                                //   console.log(res);
                                  var subTotal = res[0].price * quantity;
                                //   console.log(typeof subTotal);
                                  var salesTax = subTotal * 0.07;
                                  
                                //   console.log(typeof salesTax);
                                
                                 
                                  var total = parseFloat(subTotal + salesTax).toFixed(2);
                                
                                  console.log("\n\nYour sale total is $".green + total.green);
                              });
                              var newQuantity = res[resId].stock_quantity-quantity;
                              connection.query("UPDATE products SET  ? WHERE ?",
                              [ 
                                  {
                                    stock_quantity: newQuantity
                                  },
                                  {
                                    item_id: id
                                  }
                                ],
                                  function(err,res){
                                  if(err) throw err;
                                  inquirer
                                    .prompt({
                                        name: "shopAgain",
                                        type: "confirm",
                                        message: "Do you want to buy something else?"
                                    }).then(function(answer){
                                        if(answer.shopAgain){
                                            customerApp();
                                        } else {
                                        connection.end();
                                        }
                                    });
                                  
                              });
                           

                          } else if(answer.quantity > res[id].stock_quantity){
                              console.log("INSUFFICIENT QUANTITY".red);
                              customerApp();
                          } else {
                              console.log("You must enter in an integer for both questions. Please try again.".red);
                              customerApp();
                          }
                      });
                });
            });
    });
}

module.exports.customerApp = customerApp;