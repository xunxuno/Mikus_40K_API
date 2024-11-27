CREATE DATABASE Mikus_40K;

USE Mikus_40K;

CREATE TABLE IF NOT EXISTS Users(
	id INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_Name VARCHAR(255) NOT NULL,
    product_Description VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    shippingType VARCHAR(255) NOT NULL,
    shippingPrice INT NOT NULL,
    category ENUM('Miku', 'Warhammer') NOT NULL
);

CREATE TABLE IF NOT EXISTS Cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS CartItems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price INT NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES Cart(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE TABLE IF NOT EXISTS Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_price INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS OrderItems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);



SELECT * FROM Users ORDER BY id DESC;
SELECT * FROM Products ORDER BY id DESC;
SELECT * FROM Cart;
SELECT * FROM CartItems;

INSERT INTO Products (
    product_Name,
    product_Description,
    price,
    image_path,
    shippingType,
    shippingPrice,
    category
) 
VALUES (
    'Miku blood angel Figure', 
    'Figura de Hatsune Miku de los angeles sangrientos.', 
    1500, 
    'src/dataBase/Images/miku_w_1.jpeg', 
    'Standard', 
    200, 
    'Warhammer'
);