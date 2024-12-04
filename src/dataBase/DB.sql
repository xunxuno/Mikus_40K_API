CREATE DATABASE Mikus_40K;

USE Mikus_40K;

CREATE TABLE IF NOT EXISTS Users(
	id INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS UserDetails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(15),
    country VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    zip_code VARCHAR(5) NOT NULL,
    street VARCHAR(100),
    house_number VARCHAR(10),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE
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
ALTER TABLE Products ADD UNIQUE (product_Name);


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
ALTER TABLE cart
ADD COLUMN state ENUM('pendiente', 'finalizado') DEFAULT 'pendiente';

ALTER TABLE CartItems
ADD COLUMN product_name VARCHAR(255) NOT NULL;

UPDATE CartItems
JOIN Products ON CartItems.product_id = Products.id
SET CartItems.product_name = Products.product_Name;

ALTER TABLE CartItems
ADD CONSTRAINT fk_product_name FOREIGN KEY (product_name) REFERENCES Products(product_Name);






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
SELECT * FROM UserDetails ORDER BY id DESC;
SELECT * FROM Products ORDER BY id DESC;
SELECT * FROM Cart;
SELECT * FROM CartItems;
SELECT * FROM Orders ORDER BY id DESC;

UPDATE Products
SET image_path = 'src/images/products_IMG/img_1.webp'
WHERE id= 1;
UPDATE Products
SET image_path = 'src/images/products_IMG/img_2.webp'
WHERE id= 2;


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
    'src/images/products_IMG/img_1.webp', 
    'Standard', 
    200, 
    'Warhammer'
);
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
    'Miku Ultramarine Figure', 
    'Figura de Hatsune Miku de los ultramarines.', 
    1200, 
    'src/images/products_IMG/img_2.webp', 
    'Standard', 
    200, 
    'Warhammer'
);