-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 17, 2018 at 02:27 PM
-- Server version: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dss`
--

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

CREATE TABLE `content` (
  `id` int(255) NOT NULL,
  `file_name` longtext COLLATE utf8_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`id`, `file_name`) VALUES
(1, '2018111714135278859067_YnVyZ2VyMQ==.jpg'),
(2, '2018111714142670546853_YnVyZ2VyMg==.jpg'),
(3, '2018111714143818743423_YnVyZ2VyMw==.jpg'),
(4, '2018111714145168845200_YnVyZ2VyNA==.jpg'),
(5, '2018111714164713298_Y29mZmVlMQ==.jpg'),
(6, '2018111714165849647188_Y29mZmVlMg==.jpg'),
(7, '2018111714170766262371_Y29mZmVlMw==.jpg'),
(8, '2018111714172788659839_aWNlY3JlYW0x.jpg'),
(9, '2018111714174109552546_aWNlY3JlYW0y.jpg'),
(10, '2018111714174940298971_cGl6emEx.jpg'),
(11, '2018111714180147228289_cGl6emEy.jpg'),
(12, '2018111714181101725250_cGl6emEz.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `content`
--
ALTER TABLE `content`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;