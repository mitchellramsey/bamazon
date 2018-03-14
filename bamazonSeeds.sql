DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(80) NOT NULL,
    department_name VARCHAR(80) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY(item_id)
);




INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Thor: Ragnarok", "Movies", 22.96, 15),
("Justice League", "Movies", 24.96, 15),
("The Greatest Showman", "Movies", 19.96, 15),
("Jumanji: Welcome to the Jungle", "Movies", 19.96, 15),
("Firepower by Judas Priest", "Music", 11.88, 10),
("Both Sides of the Sky by Jimi Hendrix", "Music", 9.97, 10),
("Hamilton (Original Broadway Cast Recording)", "Music", 18.99, 10),
("Evolve by Imagine Dragons", "Music", 11.88, 10),
("The Great Alone by Kristin Hannah", "Books", 17.39, 20),
("Fifty Fifty (Harriet Blue) by James Patterson", "Books", 16.79, 20),
("The Woman in the Window by A.J. Finn", "Books", 16.19, 20),
("An American Marriage by Tayari Jones","Books", 16.17, 20),
("Call of Duty: World War II", "Video Games", 39.99, 5),
("State of Decay 2", "Video Games", 49.99, 5),
("Destiny 2", "Video Games", 24.99, 5),
("Assassin's Creed: Origins", "Video Games", 37.87, 5);



SELECT * FROM bamazon_DB.products;