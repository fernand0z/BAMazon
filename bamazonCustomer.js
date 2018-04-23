//BAMazon Storefront
//This script file handles the CUSTOMER interface
//Created by: Fernando Zacarias

//Declare npm packages
const mysql = require("mysql");
const inquirer = require("inquirer");
const cliTable = require("cli-table");
const cTable = require("console.table");
const chalk = require("chalk");
//Database connection credentials
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    //Username
    user: "root",
    //Password
    password: "root",
    database: "bamazon"
});

//Connect to MySQL Database and query customer data columns
function queryInventory() {
    var data = [];
    connection.query("SELECT ID, PRODUCT_NAME, DEPARTMENT, PRICE_$ FROM products", function (err, res) {
        if (err) throw err;
        //Call displayInventory function to display table data, passing through res parameter
        displayInventory(res);
    })

};
//Display welcome and marketplace items to customer
function displayInventory(data) {
    console.log(chalk.magenta.bold("=================================== WELCOME TO BAMAZON! ==================================="));
    console.log(chalk.blue.bold("\nHere are items currently available for purchase:\n"));
    console.table(data);
    console.log(chalk.magenta.bold("==========================================================================================="));
    //Call function to prompt customer for purchase ID
    promptCustomer();
};

function promptCustomer() {
    //Prompt for item ID
    inquirer.prompt([
        {
            type: "input",
            name: "idPrompt",
            message: "Enter the ID of the product you would like to purchase: "
        },
        {
            type: "input",
            name: "qtyPrompt",
            message: "How many would you like to purchase?"
        }
    ]).then(function (answers) {
        //Variables to hold user input
        var purchaseID = answers.idPrompt;
        var purchaseQty = answers.qtyPrompt;
        //!!!REMOVE AFTER DEBUGGGING
        //console.log("Purchase ID: " + purchaseID);
        //console.log("Purchase Quantity: " + purchaseQty);
        //If statement for input validation against available items
        connection.query("SELECT ID, PRODUCT_NAME, DEPARTMENT, PRICE_$ FROM products WHERE ?",
            {
                id: purchaseID
            },
            function (err, res) {
                if (err) throw err;
                if (res == "") {
                    console.log(chalk.cyan.bold("==================================================================="));
                    console.log(chalk.bgRed("Please enter a valid Product ID from the items listed above."));
                    promptCustomer();
                }
                else {
                    console.log(chalk.cyan.bold("==================================================================="));
                    console.log("\nYou have selected " + (chalk.green.bold("QUANTITY: ")) + (chalk.green.bold(purchaseQty)) + " of the following item: \n");
                    console.table(res);
                };

                //Check inventory quantity
                connection.query("SELECT STOCK_QTY FROM products WHERE ?",
                    {
                        id: purchaseID
                    },
                    function (err, res) {
                        if (err) throw err;
                        if (purchaseQty > res[0].STOCK_QTY) {
                            console.log(chalk.cyan.bold("==================================================================="));
                            console.log(chalk.bgRed("Apologies.  We do not have enough of your item in stock to complete the order."));
                            console.log(chalk.red("Please revise your order to a quantity of " + (chalk.red.bold(res[0].STOCK_QTY)) + " or less."));
                            promptCustomer();
                        }
                        else {
                            console.log(chalk.green("Sufficient items in stock to complete your order"));
                            console.log(chalk.cyan.bold("==================================================================="));
                            //variable to hold updated quantity
                            var newQty = res[0].STOCK_QTY -= purchaseQty;
                            //!!REMOVE AFTER DEBUGGING
                            //console.log(newQty);
                            connection.query("UPDATE products SET ? WHERE ?",
                                [
                                    {
                                        STOCK_QTY: newQty
                                    },
                                    {
                                        id: purchaseID
                                    }
                                ]
                                , function (err, res) {
                                    orderTotal(purchaseID, purchaseQty);
                                }
                            )
                        };

                    })
            });
        function orderTotal(itemId, itemQty) {
            connection.query("SELECT PRICE_$ FROM products WHERE ?",
                [
                    {
                        id: itemId
                    }
                ],
                function (err, res) {
                    console.log(chalk.green.bold("Your order has been submitted!"));
                    var total = res[0].PRICE_$ * purchaseQty;
                    console.log(chalk.magenta.bold("\nYour order total is: "));
                    console.log(chalk.green.bold("$" + total));
                    console.log(chalk.cyan.bold("\nThank you for using Bamazon!"));
                //Terminate database connection
                connection.end();
                }
            )
        }
    });
};

queryInventory();