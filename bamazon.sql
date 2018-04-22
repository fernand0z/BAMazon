--MySQL script to create necessary database and table for BAMazon CLI storefront project
--Created by Fernando Zacarias

DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(90) NOT NULL,
  department_name VARCHAR(90) NOT NULL,
  price FLOAT(6,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple Watch", "Technology", 329.99, 150)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("128GB USB3.0 Flash Drive", "Technology", 29.99, 85)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("32-inch Curved OLED Monitor", "Technology", 279.99, 34)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Quadcopter Drone with 4K Ultra-HD Camera", "Technology", 288.99, 61)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Donkey Tail Succulent - 12-inch houseplant", "Home & Garden", 18.00, 72)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jade Plant - 4-inch potted houseplant", "Home & Garden", 9.99, 165)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bamboo Sheets-600 thread ct, QUEEN", "Home & Garden", 114.99, 48)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Top Gun, BlueRay DVD", "Videos", 14.96, 39)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fifty Shades of Grey, BlueRay DVD", "Videos", 19.96, 44)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Inglorious Bastards, BlueRay DVD", "Videos", 19.96, 95)

