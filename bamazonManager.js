//BAMazon Storefront - Manager Module
//This script file handles the MANAGER interface
//Created by: Fernando Zacarias

//Declare npm dependencies 
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const chalk = require("chalk");
const prompt = require("prompt");
const colors = require("colors");
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
//Connect to Database
connection.connect(function (err) {
    if (err) throw err;

    //Prompt user with options (note I could have used inquier to make a list, but the assignment seemed to prefer prompt)
    prompt.start();

    //Display Menu
    console.log(chalk.bold.cyan('========================================================='));
    console.log(chalk.bold.cyan('\nBamazon Manager Menu'));
    console.log(chalk.bold.cyan('========================================================='));
    console.log('Select a (numeric) option.')
    console.log('1. View Products for Sale');
    console.log('2. View Low Inventory');
    console.log('3. Add to Inventory');
    console.log('4. Add New Product');

    prompt.get(['menuSelection'], function (err, result) {

        // Switch Case for different options
        var menuSelection = parseInt(result.menuSelection);

        switch (menuSelection) {
            case 1:
                console.log('\nView Products for Sale...');
                viewProducts(function () { }); // note that this function uses a callback :)
                connection.end(); // end the script/connection
                break;

            case 2:
                console.log('\nView Low Inventory...');
                viewLowInventory();
                connection.end(); // end the script/connection
                break;

            case 3:
                console.log('\nAdd to Inventory...');
                addInventory();
                break;

            case 4:
                console.log('\nAdd New Product...');
                addNewProduct();
                break;

            default:
                console.log(chalk.bgRed('Not a vaild entry. Exiting program.'));
                connection.end(); // end the script/connection

        } // end switch case

    }); // end switch case prompt

}); // end connection

// =================== Functions to be used inside the switch case ===================
// View Products for sale (complete with a callback function)
function viewProducts(callback) {
    // Display all rows from products table in database
    connection.query('SELECT * FROM products', function (err, res) {
        // Error Handler
        if (err) throw err;
        //Describe info
        console.log('All available merchandise listed below...\n'); 
        //Display data in table format to user
            console.table(res);
        // Callback function (for use in case 3 to counter asynch behavior)
        callback();
    });
}

// ---------------------------------------------------------------------------------

// View Low Inventory
function viewLowInventory() {
    // Display All Items inside Database lower than 5 in stock
    connection.query('SELECT * FROM products WHERE STOCK_QTY < 50', function (err, res) {

        // Error Handler
        if (err) throw err;

        // Show User message
        console.log(colors.magenta('Inventory of items with ' + colors.bold("QTY 50") + ' or less is below...\n'));

        console.table(res);
        
        console.log('\nBegin replenishing inventory!');
    });
}


// ---------------------------------------------------------------------------------

// Add to Inventory
function addInventory() {

    // Running the View Products Function (case 1) and then asking user for unput after callback
    viewProducts(function () {

        // Prompt user for re-stock item
        prompt.start();
        console.log('\nWhich item do you want to restock?');
        prompt.get(['restockItemID'], function (err, result) {

            // Show Item ID selected
            var restockItemID = result.restockItemID;
            console.log('You selected to re-stock Item # ' + restockItemID + '.');

            // Prompt for how many more items
            console.log('\nHow many items will you restock?');
            prompt.get(['restockCount'], function (err, result) {

                //Show Restock Count selected
                var restockCount = result.restockCount;
                console.log('You selected to re-stock ' + restockCount + ' items.');
                restockCount = parseInt(restockCount); // convert to integer

                if (Number.isInteger(restockCount)) {

                    // Query for current item inventory
                    connection.query('SELECT StockQuantity FROM Products WHERE ?', [{ ItemID: restockItemID }], function (err, res) {

                        // Check if the item Id was valid (i.e. something was returned from mySQL)
                        if (res[0] == undefined) {

                            console.log('Sorry... We found no items with Item ID "' + restockItemID + '"');
                            connection.end(); // end the script/connection

                        }
                        // Valid Item ID, so add Bamazon Inventory with stowing quantity <-- more Bamazon lingo ;)
                        else {

                            var bamazonQuantity = res[0].StockQuantity;
                            var newInventory = parseInt(bamazonQuantity) + parseInt(restockCount); // ensure integers

                            // Update Database with new items
                            connection.query('UPDATE Products SET ? WHERE ?', [{ StockQuantity: newInventory }, { ItemID: restockItemID }], function (err, res) {
                                if (err) throw err; // Error Handler

                                console.log('\nInventory updated successfully! How customer-centric!') // Inside jokes for days!
                                connection.end(); // end the script/connection

                            }); // end inventory update query

                        }

                    }); // end current quantity query
                }
                else {
                    console.log('Only whole items can be added. Integers only!')
                    connection.end(); // end the script/connection
                }

            }); // end prompt 2 (amount to add)

        }); // end prompt 1 (item id)

    }); // end case 1 callback

}


// ---------------------------------------------------------------------------------

// Add New Product
function addNewProduct() {

    // Prompt user for new item details
    prompt.start();
    console.log('\nComplete the new product details:');
    prompt.get(['ProductName', 'DepartmentName', 'Price', 'Quantity'], function (err, result) {

        // Collect/parse variables
        var productName = result.ProductName;
        var departmentName = result.DepartmentName;
        var price = result.Price;
        var quantity = result.Quantity;

        // Update Database
        connection.query('INSERT INTO Products SET ?', {
            ProductName: productName,
            DepartmentName: departmentName,
            Price: price,
            StockQuantity: quantity
        }, function (err, res) {

            // Slighly more refined Error Handler
            if (err) {
                console.log('\nSorry. The SQL database could not be updated.\n' +
                    'Please ensure you entered the price and quantity as numbers!');
                connection.end(); // end the script/connection
            }
            else {
                console.log('\nInventory updated successfully!')
                connection.end(); // end the script/connection
            }

        });

    });

}
