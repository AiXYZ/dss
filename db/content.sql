-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2018 at 11:39 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `dss`
--

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

CREATE TABLE IF NOT EXISTS `content` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `file_name` longtext COLLATE utf8_bin,
  `file_thumbnail` longtext COLLATE utf8_bin,
  `file_type` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=9 ;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`id`, `file_name`, `file_thumbnail`, `file_type`) VALUES
(1, '2018112113291365047070_YnVyZ2VyMQ==.jpg', NULL, 'image'),
(2, '2018112113293345078296_YnVyZ2VyMg==.jpg', NULL, 'image'),
(3, '2018112113295015472594_YnVyZ2VyMw==.jpg', NULL, 'image'),
(4, '2018112113295018561976_YnVyZ2VyNA==.jpg', NULL, 'image'),
(5, '2018112113295021939258_Y29mZmVlMQ==.jpg', NULL, 'image'),
(6, '2018112113303287815231_Y29mZmVl.mp4', '2018112113303287815231_Y29mZmVl.png', 'video'),
(7, '2018112113350060569245_Y29mZmVlMg==.mp4', '2018112113350060569245_Y29mZmVlMg==.png', 'video'),
(8, '2018112113351825287059_Y29mZmVlMw==.mp4', '2018112113351825287059_Y29mZmVlMw==.png', 'video');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
