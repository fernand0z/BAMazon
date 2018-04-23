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


//Connect to MySQL Database and display inventory to customer
(function displayInventory(){
    
    console.log(chalk.magenta.bold("=================================== WELCOME TO BAMAZON! ==================================="));
    console.log(chalk.blue.bold("\nHere are items currently available for purchase:"));
    connection.query("SELECT ID, PRODUCT_NAME, DEPARTMENT, PRICE_$ FROM products", function(err, res){
        if (err) throw err;
        //Display all rows from products table
        console.table(res);
        //Terminate database connection
    //    connection.end();
    })
    promptCustomer();
})();
function promptCustomer() {
    console.log(chalk.magenta.bold("==========================================================================================="));
    
    
    inquirer.prompt([
    {
        type: "input",
        name: "custPrompt",
        message: "Enter the ID of the product you would like to purchase: "
    }

]);
};
    

