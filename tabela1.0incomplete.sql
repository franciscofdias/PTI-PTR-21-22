-- MySQL Script generated by MySQL Workbench
-- Sun Mar 27 12:29:03 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`customer_login`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`customer_login` ;

CREATE TABLE IF NOT EXISTS `mydb`.`customer_login` (
  `customer_id` INT NOT NULL,
  `login_name` CHAR(20) NOT NULL,
  `password` CHAR(32) NOT NULL,
  PRIMARY KEY (`customer_id`));


-- -----------------------------------------------------
-- Table `mydb`.`customer_address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`customer_address` ;

CREATE TABLE IF NOT EXISTS `mydb`.`customer_address` (
  `customer_addr_id` INT NOT NULL,
  `customer_id` INT NOT NULL,
  `zip` SMALLINT NOT NULL,
  `province` SMALLINT NOT NULL,
  `city` SMALLINT NOT NULL,
  `district` SMALLINT NOT NULL,
  `address` VARCHAR(200) NOT NULL,
  `is_default` SMALLINT NOT NULL,
  PRIMARY KEY (`customer_addr_id`),
  CONSTRAINT `fk_customer_login_customer_address`
    FOREIGN KEY (`customer_id`)
    REFERENCES `mydb`.`customer_login` (`customer_id`));


-- -----------------------------------------------------
-- Table `mydb`.`customer_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`customer_info` ;

CREATE TABLE IF NOT EXISTS `mydb`.`customer_info` (
  `customer_info_id` INT NOT NULL,
  `customer_id` INT NOT NULL,
  `customer_name` VARCHAR(20) NOT NULL,
  `mobile_phone` INT UNSIGNED NULL DEFAULT NULL,
  `customer_email` VARCHAR(50) NULL DEFAULT NULL,
  `gender` CHAR(1) NULL DEFAULT NULL,
  `customer_type` TINYINT NOT NULL,
  `user_money` DECIMAL(8,2) NOT NULL,
  PRIMARY KEY (`customer_info_id`),
  CONSTRAINT `fk_customer_login_customer_info`
    FOREIGN KEY (`customer_id`)
    REFERENCES `mydb`.`customer_login` (`customer_id`));


-- -----------------------------------------------------
-- Table `mydb`.`product_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`product_info` ;

CREATE TABLE IF NOT EXISTS `mydb`.`product_info` (
  `product_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(20) NOT NULL,
  `one_category_id` SMALLINT UNSIGNED NOT NULL,
  `two_category_id` SMALLINT UNSIGNED NOT NULL,
  `supplier_id` INT UNSIGNED NOT NULL,
  `price` DECIMAL(8,2) NOT NULL,
  `production_date` DATETIME NOT NULL,
  `shelf_life` INT NOT NULL,
  `descript` TEXT NOT NULL,
  PRIMARY KEY (`product_id`));


-- -----------------------------------------------------
-- Table `mydb`.`product_pic_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`product_pic_info` ;

CREATE TABLE IF NOT EXISTS `mydb`.`product_pic_info` (
  `product_pic_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `pic_desc` VARCHAR(50) NULL DEFAULT NULL,
  `pic_url` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`product_pic_id`),
  CONSTRAINT `fk_product_info_product_pic_info`
    FOREIGN KEY (`product_id`)
    REFERENCES `mydb`.`product_info` (`product_id`));


-- -----------------------------------------------------
-- Table `mydb`.`order_master`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`order_master` ;

CREATE TABLE IF NOT EXISTS `mydb`.`order_master` (
  `order_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_sn` BIGINT UNSIGNED NOT NULL,
  `customer_id` INT UNSIGNED NOT NULL,
  `shipping_user` VARCHAR(10) NOT NULL,
  `province` SMALLINT NOT NULL,
  `city` SMALLINT NOT NULL,
  `district` SMALLINT NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  `payment_method` TINYINT NOT NULL,
  `order_money` DECIMAL(8,2) NOT NULL,
  `shipping_money` DECIMAL(8,2) NOT NULL DEFAULT 0.00,
  `payment_money` DECIMAL(8,2) NOT NULL DEFAULT 0.00,
  `shipping_comp_name` VARCHAR(10) NULL DEFAULT NULL,
  `shipping_sn` VARCHAR(50) NULL DEFAULT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `shipping_time` DATETIME NULL DEFAULT NULL,
  `pay_time` DATETIME NULL DEFAULT NULL,
  `receive_time` DATETIME NULL DEFAULT NULL,
  `order_status` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`order_id`));


-- -----------------------------------------------------
-- Table `mydb`.`warehouse_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`warehouse_info` ;

CREATE TABLE IF NOT EXISTS `mydb`.`warehouse_info` (
  `w_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `warehouse_sn` CHAR(5) NOT NULL,
  `warehouse_name` VARCHAR(10) NOT NULL,
  `warehouse_phone` VARCHAR(20) NOT NULL,
  `contact` VARCHAR(10) NOT NULL,
  `province` SMALLINT NOT NULL,
  `city` SMALLINT NOT NULL,
  `district` SMALLINT NOT NULL,
  `address` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`w_id`));


-- -----------------------------------------------------
-- Table `mydb`.`order_detail`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`order_detail` ;

CREATE TABLE IF NOT EXISTS `mydb`.`order_detail` (
  `order_detail_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_id` INT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  `product_name` VARCHAR(50) NOT NULL,
  `procuct_cnt` INT NOT NULL DEFAULT 1,
  `product_price` DECIMAL(8,2) NULL DEFAULT NULL,
  `w_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`order_detail_id`),
  CONSTRAINT `fk_order_master_order_detail`
    FOREIGN KEY (`order_id`)
    REFERENCES `mydb`.`order_master` (`order_id`),
  CONSTRAINT `fk_order_detail_product_info`
    FOREIGN KEY (`product_id`)
    REFERENCES `mydb`.`product_info` (`product_id`));


-- -----------------------------------------------------
-- Table `mydb`.`order_cart`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`order_cart` ;

CREATE TABLE IF NOT EXISTS `mydb`.`order_cart` (
  `cart_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_id` INT NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  `product_amount` INT UNSIGNED NOT NULL,
  `price` DECIMAL(8,2) NOT NULL,
  PRIMARY KEY (`cart_id`),
  CONSTRAINT `fk_order_cart_customer_login`
    FOREIGN KEY (`customer_id`)
    REFERENCES `mydb`.`customer_login` (`customer_id`),
  CONSTRAINT `fk_order_cart_product_info`
    FOREIGN KEY (`product_id`)
    REFERENCES `mydb`.`product_info` (`product_id`));


-- -----------------------------------------------------
-- Table `mydb`.`warehouse_product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`warehouse_product` ;

CREATE TABLE IF NOT EXISTS `mydb`.`warehouse_product` (
  `wp_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `w_id` SMALLINT UNSIGNED NOT NULL,
  `current_cnt` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`wp_id`),
  CONSTRAINT `fk_warehouse_product_product_info`
    FOREIGN KEY (`product_id`)
    REFERENCES `mydb`.`product_info` (`product_id`));


-- -----------------------------------------------------
-- Table `mydb`.`shipping_info`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`shipping_info` ;

CREATE TABLE IF NOT EXISTS `mydb`.`shipping_info` (
  `ship_id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `ship_name` VARCHAR(20) NOT NULL,
  `ship_contact` VARCHAR(20) NOT NULL,
  `price` DECIMAL(8,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`ship_id`));


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
