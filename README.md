# :package: BAMazon :computer:

### Overview

BAMazon is a digital storefront CLI app using Node.js and MySQL.  

### Customer Module

The Customer Module application is contained in the `bamazonCustomer.js`  file.

This application interacts with a MySQL database to display available merchandise to the customer, and updates inventory based on submitted orders.

### MySQL Database


### Node Pacakges (npm)

To run the modules in your CLI terminal application, use the Node Package Manager to install the npm dependences.  Prior to running the application's .js file, enter the following into your CLI terminal program:
`npm install`

or you may manually install each of the packages

`npm i mysql` <br>

`npm i inquierer`

`npm i console.table`

`npm i chalk`

### Application Demo

Below is a demo of the application's functionality, including screenshots of various outcomes from user input.  

The user must first download/clone the repo *and* install the npm dependencies.  The user must also have access to the bamazon database and it's products table in MySQL.  For testing, you may open the `bamazon.sql` script file in MySQL.  Executing the script file will create the database for interaction with the application.  Please note: the `bamazonCustomer.js` file specifies a username of 'root' and password of 'root'.  Update these values in the .js file if necessary.

In your CLI, run following code to begin: 

`node bamazonCustomer.js`

A table of available merchandise will be displayed with the following columns `ID`, `PRODUCT_NAME`, `DEPARTMENT`, and `PRICE_$`.  The customer will be prompted to select an item to purchase by entering its `ID`.
- Customer Module - Initial View Screenshot
![Customer Main Screen](https://gdurl.com/UZK1)

- Customer Module - Successful Order Screenshot
![Customer Successful Order](http://www.gdurl.com/TRY2)

- Customer Module - Insufficient Inventory Screenshot
![Customer Error Order](https://gdurl.com/jexN)