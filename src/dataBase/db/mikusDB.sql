-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mikus_40k
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `state` enum('pendiente','finalizado') DEFAULT 'pendiente',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (1,8,'2024-11-27 21:49:44','pendiente'),(2,3,'2024-11-27 22:11:59','pendiente'),(3,14,'2024-12-01 08:47:27','pendiente'),(4,14,'2024-12-01 21:56:42','pendiente'),(5,14,'2024-12-01 22:20:03','pendiente'),(6,14,'2024-12-01 22:20:03','pendiente'),(7,14,'2024-12-01 23:10:34','pendiente'),(8,14,'2024-12-01 23:10:34','pendiente'),(9,14,'2024-12-01 23:20:30','pendiente'),(10,14,'2024-12-01 23:20:30','pendiente'),(11,14,'2024-12-01 23:30:58','pendiente'),(12,15,'2024-12-02 01:09:11','pendiente'),(13,15,'2024-12-02 01:11:12','pendiente'),(14,15,'2024-12-02 01:11:12','pendiente'),(15,15,'2024-12-02 01:43:49','pendiente'),(16,15,'2024-12-02 01:46:23','pendiente'),(17,15,'2024-12-02 01:46:23','pendiente'),(18,15,'2024-12-02 01:48:13','pendiente'),(19,15,'2024-12-02 01:48:13','pendiente'),(20,15,'2024-12-02 18:10:20','pendiente'),(21,15,'2024-12-02 18:10:20','finalizado'),(22,1,'2024-12-02 19:02:41','pendiente'),(23,16,'2024-12-03 20:25:16','pendiente'),(24,5,'2024-12-03 21:31:14','pendiente'),(26,17,'2024-12-03 23:03:26','pendiente'),(27,18,'2024-12-04 05:04:20','pendiente'),(28,19,'2024-12-04 05:19:21','pendiente'),(29,23,'2024-12-04 07:44:25','finalizado'),(30,23,'2024-12-04 18:41:23','finalizado'),(31,23,'2024-12-04 18:41:57','finalizado'),(32,23,'2024-12-04 18:47:48','finalizado'),(33,23,'2024-12-04 18:48:10','finalizado'),(34,23,'2024-12-04 18:50:10','finalizado'),(35,23,'2024-12-04 18:50:16','finalizado'),(36,23,'2024-12-04 19:34:39','finalizado'),(37,23,'2024-12-04 19:36:48','finalizado'),(38,23,'2024-12-04 20:52:43','finalizado'),(39,24,'2024-12-04 20:55:47','finalizado'),(40,24,'2024-12-04 20:59:03','finalizado'),(41,24,'2024-12-04 21:03:34','finalizado'),(42,28,'2024-12-04 21:04:35','finalizado'),(43,28,'2024-12-04 21:05:12','finalizado'),(44,28,'2024-12-04 21:06:49','pendiente');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartitems`
--

DROP TABLE IF EXISTS `cartitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartitems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `price` int NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cart_id` (`cart_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cartitems_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  CONSTRAINT `cartitems_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartitems`
--

LOCK TABLES `cartitems` WRITE;
/*!40000 ALTER TABLE `cartitems` DISABLE KEYS */;
INSERT INTO `cartitems` VALUES (1,1,1,2,1500,'Miku blood angel Figure'),(2,2,1,4,1500,'Miku blood angel Figure'),(3,3,1,1,1500,'Miku blood angel Figure'),(4,3,1,1,1500,'Miku blood angel Figure'),(5,3,1,5,1500,'Miku blood angel Figure'),(6,5,1,2,1500,'Miku blood angel Figure'),(7,6,2,2,1200,'Miku Ultramarine Figure'),(8,7,2,2,1200,'Miku Ultramarine Figure'),(9,8,1,3,1500,'Miku blood angel Figure'),(10,9,2,2,1200,'Miku Ultramarine Figure'),(11,10,1,1,1500,'Miku blood angel Figure'),(12,11,1,1,1500,'Miku blood angel Figure'),(13,13,1,1,1500,'Miku blood angel Figure'),(14,14,2,1,1200,'Miku Ultramarine Figure'),(15,15,1,1,1500,'Miku blood angel Figure'),(16,16,1,1,1500,'Miku blood angel Figure'),(17,17,2,1,1200,'Miku Ultramarine Figure'),(18,18,1,3,1500,'Miku blood angel Figure'),(19,19,2,3,1200,'Miku Ultramarine Figure'),(20,20,2,3,1200,'Miku Ultramarine Figure'),(21,21,1,3,1500,'Miku blood angel Figure'),(23,23,2,12,1200,'Miku Ultramarine Figure'),(24,23,1,1,1500,'Miku blood angel Figure'),(25,23,1,1,1500,'Miku blood angel Figure'),(26,23,2,12,1200,'Miku Ultramarine Figure'),(27,23,2,12,1200,'Miku Ultramarine Figure'),(28,23,2,12,1200,'Miku Ultramarine Figure'),(29,23,2,12,1200,'Miku Ultramarine Figure'),(30,23,2,12,1200,'Miku Ultramarine Figure'),(31,23,2,12,1200,'Miku Ultramarine Figure'),(32,23,2,12,1200,'Miku Ultramarine Figure'),(33,23,2,12,1200,'Miku Ultramarine Figure'),(34,23,2,12,1200,'Miku Ultramarine Figure'),(35,23,2,12,1200,'Miku Ultramarine Figure'),(36,23,2,12,1200,'Miku Ultramarine Figure'),(37,23,2,12,1200,'Miku Ultramarine Figure'),(38,23,1,1,1500,'Miku blood angel Figure'),(39,23,2,12,1200,'Miku Ultramarine Figure'),(40,23,2,12,1200,'Miku Ultramarine Figure'),(41,23,2,12,1200,'Miku Ultramarine Figure'),(42,23,2,12,1200,'Miku Ultramarine Figure'),(43,26,1,2,1500,'Miku blood angel Figure'),(44,26,2,4,1200,'Miku Ultramarine Figure'),(45,24,1,2,1500,NULL),(46,27,1,2,1500,NULL),(47,27,2,1,1200,NULL),(48,27,2,3,1500,NULL),(49,28,1,2,1500,'Miku blood angel Figure'),(50,28,2,1,1200,'Miku Ultramarine Figure'),(56,29,2,1,1200,'Miku Ultramarine Figure'),(57,30,2,1,1200,'Miku Ultramarine Figure'),(58,30,1,1,1500,'Miku blood angel Figure'),(59,31,2,1,1200,'Miku Ultramarine Figure'),(60,32,1,3,1500,'Miku blood angel Figure'),(61,32,2,1,1200,'Miku Ultramarine Figure'),(62,33,2,1,1200,'Miku Ultramarine Figure'),(63,34,2,1,1200,'Miku Ultramarine Figure'),(64,35,2,1,1200,'Miku Ultramarine Figure'),(65,36,2,1,1200,'Miku Ultramarine Figure'),(66,37,2,4,1200,'Miku Ultramarine Figure'),(67,38,2,2,1200,'Miku Ultramarine Figure'),(68,38,1,1,1500,'Miku blood angel Figure'),(69,39,1,3,1500,'Miku blood angel Figure'),(70,39,2,2,1200,'Miku Ultramarine Figure'),(71,40,2,1,1200,'Miku Ultramarine Figure'),(72,41,1,3,1500,'Miku blood angel Figure'),(73,41,2,1,1200,'Miku Ultramarine Figure'),(74,42,2,1,1200,'Miku Ultramarine Figure'),(75,43,2,2,1200,'Miku Ultramarine Figure'),(76,43,1,1,1500,'Miku blood angel Figure');
/*!40000 ALTER TABLE `cartitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderitems`
--

DROP TABLE IF EXISTS `orderitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderitems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `price` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderitems`
--

LOCK TABLES `orderitems` WRITE;
/*!40000 ALTER TABLE `orderitems` DISABLE KEYS */;
INSERT INTO `orderitems` VALUES (1,1,1,3,1500),(2,2,2,1,1200),(3,3,2,1,1200),(4,3,1,1,1500),(5,4,2,1,1200),(6,5,1,3,1500),(7,5,2,1,1200),(8,6,2,1,1200),(9,7,2,1,1200),(10,8,2,1,1200),(11,9,2,1,1200),(12,10,2,4,1200),(13,11,1,1,1500),(14,11,2,2,1200),(15,12,2,2,1200),(16,12,1,3,1500),(17,13,2,1,1200),(18,14,1,3,1500),(19,14,2,1,1200),(20,15,2,1,1200),(21,16,2,2,1200),(22,16,1,1,1500);
/*!40000 ALTER TABLE `orderitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `total_price` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,15,4500,'2024-12-02 18:44:58'),(2,23,1200,'2024-12-04 18:39:11'),(3,23,2700,'2024-12-04 18:41:37'),(4,23,1200,'2024-12-04 18:47:01'),(5,23,5700,'2024-12-04 18:48:05'),(6,23,1200,'2024-12-04 18:49:38'),(7,23,1200,'2024-12-04 18:50:13'),(8,23,1200,'2024-12-04 19:28:20'),(9,23,1200,'2024-12-04 19:36:10'),(10,23,4800,'2024-12-04 20:50:28'),(11,23,3900,'2024-12-04 20:52:56'),(12,24,6900,'2024-12-04 20:56:24'),(13,24,1200,'2024-12-04 20:59:06'),(14,24,5700,'2024-12-04 21:03:41'),(15,28,1200,'2024-12-04 21:04:38'),(16,28,3900,'2024-12-04 21:05:31');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_Name` varchar(255) NOT NULL,
  `product_Description` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `shippingType` varchar(255) NOT NULL,
  `shippingPrice` int NOT NULL,
  `category` enum('Miku','Warhammer') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_Name` (`product_Name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Miku blood angel Figure','Figura de Hatsune Miku de los angeles sangrientos.',1500,'public/images/products_IMG/img_1.webp','Standard',200,'Warhammer'),(2,'Miku Ultramarine Figure','Figura de Hatsune Miku de los ultramarines.',1200,'public/images/products_IMG/img_2.webp','Standard',200,'Warhammer'),(3,'Miku dark angel Figure','Figura de Hatsune Miku de los angeles oscuros.',1800,'public/images/products_IMG/img_3.webp','Standard',200,'Warhammer'),(4,'Miku salamandra chapter Figure','Figura de Hatsune Miku del capitulo de las salamandras.',1100,'public/images/products_IMG/img_4.webp','Standard',200,'Warhammer'),(5,'Miku inquisitor Figure','Figura de Hatsune Miku inquisora del ordo XENOS.',1700,'public/images/products_IMG/img_5.webp','Standard',200,'Warhammer'),(6,'Miku assesinorum Figure','Figura de Hatsune Miku asesina del templo CAEDUS.',1900,'public/images/products_IMG/img_6.webp','Standard',200,'Warhammer'),(7,'Miku Grey Knight Figure','Figura de Hatsune Miku caballera gris.',2300,'public/images/products_IMG/img_7.webp','Standard',200,'Warhammer'),(8,'Miku pool party Figure','Figura de Hatsune Miku en traje de baño.',8300,'public/images/products_IMG/img_8.webp','Standard',200,'Warhammer'),(9,'Miku Nurse Figure','Figura de Hatsune Miku en traje de enfermera.',5300,'public/images/products_IMG/img_9.webp','Standard',200,'Warhammer'),(10,'Miku Battle sister Figure','Figura de Hatsune Miku de hermana de batalla.',5300,'public/images/products_IMG/img_10.webp','Standard',200,'Warhammer');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userdetails`
--

DROP TABLE IF EXISTS `userdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userdetails` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `country` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `zip_code` varchar(5) NOT NULL,
  `street` varchar(100) DEFAULT NULL,
  `house_number` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `userdetails_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userdetails`
--

LOCK TABLES `userdetails` WRITE;
/*!40000 ALTER TABLE `userdetails` DISABLE KEYS */;
INSERT INTO `userdetails` VALUES (1,10,'papi','faker','5551234567','corea','seul','97000','Calle 60','123'),(2,10,'lord','faker','5551234567','corea','seul','97000','Calle 60','123'),(3,13,'viksextor','viiiktor','5551234567','arcane','piltover','65000','Calle 2','1223'),(4,1,'zzz','daada','12312312','México','Mérida','97210','d23','212'),(5,1,'g','gggggg','324234234','México','Hooo','97217','dqwd','3423'),(6,14,'gggg','gggggggggggg','34234234','ggg','wwwweeqweqw','3124','1242','123ewqe'),(7,23,'Karla Guadalupe','Larracheewqe','213123','México','Hooo','97212','dwd','23212'),(8,24,'fqf','fqwfqw','342342','gregre','gerg','2342','322','343');
/*!40000 ALTER TABLE `userdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `userName` (`userName`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ejemplo','ejemplo@gmail.com','$2y$10$2zAlMDuD6mCic7/2Pl4YGOaZDrJNIhJSu.Nz232xny1fd1Gt.BbcC'),(2,'tupu','tupu@gmail.com','$2y$10$2zAlMDuD6mCic7/2Pl4YGOaZDrJNIhJSu.Nz232xny1fd1Gt.BbcC'),(3,'www','w@w','123'),(4,'tokennn','ee@eee','123'),(5,'hpy','hpy@hpy','uy'),(6,'as','as@as','as'),(7,'hash','hash@ahsa','$2a$10$COEqEmWB/Z611PYVOyuGDu1EfhvSO.5GP.RyZ1pnCX2QEHqsO7Q42'),(8,'prueba1','prueba1@gmail.com','$2a$10$OLbqbzD15o2KkwkXnvamCuc0JcFh4L5FVR4p0RHtqEEcQEPhVeLIm'),(9,'xunxuno','x@x.com','$2a$10$M/Ie61ddedGiPiLz58ydmeESnc85LYxqerlGZ.sR/pej0724rG.1W'),(10,'faker','faker@faker.com','$2a$10$zL16jo9Skbrb/fU4z.K7VeG68GdQqvYF9ziXnBy8UWCgNmfJaSlqy'),(11,'reducer','redux@r','$2a$10$F4vcBn/QwDzs2dOs6tZqsOSH19rBmjkmZz7QP5uiqbKgzNXVMyxeO'),(12,'main','main@m','$2a$10$Hoo0EOIHJpqchoDOLMQgP.1MBWRNabKFzvH0kWw/DIDp6fM6hTvoW'),(13,'victor','v@v.com','$2a$10$7ZaIOOOzaQF/b20Oc6vN3eGgevxqaFCw9UzvOPBV5j4g3q97i9VCe'),(14,'dddd','d@d','$2a$10$foTfDH1xN8cUNKsw8ztVzugXRy9m2AOAZl.0qDXVGL./AIjvqoiNm'),(15,'carro','c@c','$2a$10$qnhPKCImAqia9fK2IqSS4OEvKhoBe1SW8RsLP22fxtPqdjawmxa8e'),(16,'mikus','mikus@mikus','$2a$10$S.rlSM5laW/nJh0QcXj7Teni2xLzTJbnPP9v1xCKJglg2SKNbIcPe'),(17,'mistico','mistico@mistico','$2a$10$WtdjfZaa4TCRDp1NyULNxuaECcDcL39w4FZXSse361nGA7v4XYl62'),(18,'carrito','carrito@carrito','$2a$10$rDx6BLZmzUEGfRWtHnB2fOIeQey2L/wMPVQCdACuA3jF7CWF8OclW'),(19,'r','r@r','$2a$10$r3CSAHdqK7fER8q5pcM02eM.pFj6sMbyzRri8lS6k.N9rh9sw8anK'),(20,'z','z@z','$2a$10$fe8VXtkztg27KbzRcTsiDOZSj60TTLBmXMVAsC2KqHbDKUMwXMnVW'),(21,'g','g@g','$2a$10$6ckJthRzZdgc/OXgT7h6jOErdYomaqR0/Jfgb9Dk2izDEHAe5dIU6'),(22,'h','h@h','$2a$10$1If7h8RWf/RFLQVMLczTEOIF41XgW6nKzukwXut2O7cbjDCK7heku'),(23,'mm','mm@mm','$2a$10$VOwhVxR2tI9gpon7yvTta.XDSi3AX5w3B6zIK6.pbwCBoipn1xS2y'),(24,'gatitaKarla','kk@kk','$2a$10$1ZE9iUcJ0K6Rx0QL7tH81O0tKO5VcYzdMbmba.kkNRhO/B30d8K7e'),(28,'mains','mad@mad','$2a$10$5us6Xdi/2fXDTr5.yGVXguuXA5nYI7Z5/0NnPNzdoqdDsRLgXiTMu');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-07 23:00:22
