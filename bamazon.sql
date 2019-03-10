DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
('slippers', 'shoes', 15.00, 12), 
('flip-flops', 'shoes', 19.00, 10), 
('dress shoes', 'shoes', 79.00, 5),
('high heels', 'shoes', 39.00, 14),
('shirt', 'clothing', 15, 8), 
('pants', 'clothing', 25, 10),
('tent', 'outdoors', 75.05, 1),
('backpack', 'outdoors', 44, 5),
('spatula', 'kitchenware', 7, 2),
('mixer', 'kitchenware', 299.99, 7),
('cell phone', 'electronics', 245.99, 8),
('watch', 'electronics', 145, 10),
('pencils', 'accessories', .75, 100),
('bottle', 'accessories', 20.12, 20),
('pens', 'accessories', 1.50, 100);