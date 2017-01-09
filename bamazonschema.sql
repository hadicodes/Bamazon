CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INT(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(75) NOT NULL,
  department_name VARCHAR(75) NOT NULL,
  price DECIMAL(6,2) NOT NULL,
  stock_quantity INT(5) NOT NULL
  PRIMARY KEY (item_id)
);
  

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Giant Bicycle','Sporting Goods', 300.00, 250),
 ('Comfort Pillow','Home Goods',25.00, 1000),
 ('iPhone 7 Case','Electronics',17.99, 5000),
 ('Juicy Fruit Gum','Grocery', 4.99, 600),
 ('Crocs Slippers','Accessories', 19.99, 700),
 ('Swiss Cutlery Set','Home Goods', 99.99, 250),
 ('Aquafina Waterbottles','Sporting Goods', 4.99 , 200),
 ('Huggies Diapers','Baby', 14.99, 100),
 ('Wolverine Action Figure','Toys', 7.99, 70),
 ('SnowBrush','Automotive', 6.80, 80)
;


