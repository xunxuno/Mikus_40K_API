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


SELECT * FROM Users ORDER BY id DESC;