-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 05, 2019 at 08:22 PM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bridge`
--

-- --------------------------------------------------------

--
-- Table structure for table `academic_year`
--

CREATE TABLE `academic_year` (
  `id` int(11) NOT NULL,
  `time` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `academic_year`
--

INSERT INTO `academic_year` (`id`, `time`) VALUES
(1, '2019-2020');

-- --------------------------------------------------------

--
-- Table structure for table `assessments`
--

CREATE TABLE `assessments` (
  `id` int(11) NOT NULL,
  `period` int(11) NOT NULL,
  `name` text NOT NULL,
  `month` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `subject` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `assessments`
--

INSERT INTO `assessments` (`id`, `period`, `name`, `month`, `type`, `subject`) VALUES
(1, 2, 'Test 1', 1, 1, 1),
(2, 2, 'Test 1', 1, 1, 3),
(3, 2, 'Test 1', 1, 1, 5),
(4, 2, 'Test 1', 1, 1, 8),
(5, 2, 'Test 1', 1, 1, 9),
(6, 2, 'Test 1', 1, 1, 12);

-- --------------------------------------------------------

--
-- Table structure for table `enrollment`
--

CREATE TABLE `enrollment` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `subject` text NOT NULL,
  `period` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `enrollment`
--

INSERT INTO `enrollment` (`id`, `student_id`, `subject`, `period`) VALUES
(1, 1, '4', '2'),
(2, 1, '5', '2'),
(4, 3, '1', '2'),
(7, 12, '1', '2'),
(8, 12, '6', '2'),
(9, 12, '9', '2'),
(10, 12, '12', '2'),
(11, 13, '1', '2'),
(12, 13, '6', '2'),
(13, 13, '9', '2'),
(14, 13, '12', '2'),
(15, 14, '16', '2');

-- --------------------------------------------------------

--
-- Table structure for table `info`
--

CREATE TABLE `info` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `info`
--

INSERT INTO `info` (`id`, `name`, `type`) VALUES
(1, 'school 101', 1);

-- --------------------------------------------------------

--
-- Table structure for table `marks`
--

CREATE TABLE `marks` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `stream` int(11) NOT NULL,
  `test_id` int(11) NOT NULL,
  `marks` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `marks`
--

INSERT INTO `marks` (`id`, `student_id`, `stream`, `test_id`, `marks`) VALUES
(1, 3, 1, 1, 10),
(2, 12, 1, 1, 100),
(3, 1, 5, 3, 100),
(4, 12, 9, 5, 80),
(5, 12, 12, 6, 75);

-- --------------------------------------------------------

--
-- Table structure for table `periods`
--

CREATE TABLE `periods` (
  `id` int(11) NOT NULL,
  `academic_year` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `periods`
--

INSERT INTO `periods` (`id`, `academic_year`, `name`) VALUES
(1, 1, 'Term 1'),
(2, 1, 'Term 2');

-- --------------------------------------------------------

--
-- Table structure for table `streams`
--

CREATE TABLE `streams` (
  `id` int(11) NOT NULL,
  `grade` text NOT NULL,
  `stream` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `streams`
--

INSERT INTO `streams` (`id`, `grade`, `stream`) VALUES
(1, '7', 'A'),
(2, '7', 'B'),
(3, '8', 'A'),
(4, '8', 'B'),
(5, '9', 'A'),
(6, '9', 'B'),
(7, '10', 'A'),
(8, '10', 'B'),
(9, '11', 'A'),
(10, '11', 'B'),
(11, '12', 'A'),
(12, '12', 'B'),
(15, '7', 'C');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `gender` int(11) NOT NULL,
  `image` text NOT NULL,
  `email` text NOT NULL,
  `tel` text NOT NULL,
  `grade` text NOT NULL,
  `DOB` date NOT NULL,
  `password` text NOT NULL,
  `status` int(11) NOT NULL,
  `account_status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `gender`, `image`, `email`, `tel`, `grade`, `DOB`, `password`, `status`, `account_status`) VALUES
(1, 'Mickaa', 1, '', '', '', '10', '2003-12-01', '', 1, 1),
(3, 'Nezerwa', 1, '', '', '', '8', '2003-12-02', '', 1, 1),
(11, 'patrick', 0, '', '', '', '10', '2019-07-19', '', 0, 0),
(12, 'Arnaud vianey', 0, '', '', '', '8', '2005-07-21', '', 0, 0),
(13, 'Carole', 1, '', '', '', '8', '2003-12-02', '', 0, 0),
(14, 'Test', 1, '', '', '', '15', '2019-08-03', '', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int(11) NOT NULL,
  `subject_name` text NOT NULL,
  `stream` int(11) NOT NULL,
  `hours` int(11) NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `subject_name`, `stream`, `hours`, `type`) VALUES
(1, 'Math', 8, 5, 1),
(2, 'ICT', 7, 5, 1),
(3, 'Math', 7, 5, 1),
(4, 'Math', 10, 5, 1),
(5, 'ICT', 10, 5, 1),
(6, 'Eng', 8, 5, 1),
(7, 'Eng', 10, 5, 1),
(8, 'Eng', 7, 5, 1),
(9, 'PE', 8, 5, 1),
(10, 'PE', 10, 5, 1),
(11, 'PE', 7, 5, 1),
(12, 'CRE', 8, 5, 1),
(13, 'CRE', 10, 5, 1),
(14, 'CRE', 7, 5, 1),
(15, 'life', 1, 3, 1),
(16, 'PE', 15, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `teaches`
--

CREATE TABLE `teaches` (
  `id` int(11) NOT NULL,
  `subject` int(11) NOT NULL,
  `teacher` int(11) NOT NULL,
  `year` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teaches`
--

INSERT INTO `teaches` (`id`, `subject`, `teacher`, `year`) VALUES
(1, 1, 1, 1),
(2, 2, 1, 1),
(3, 3, 1, 1),
(14, 2, 14, 1),
(15, 3, 15, 1),
(16, 2, 16, 1),
(17, 1, 19, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `gender` int(11) NOT NULL,
  `email` text NOT NULL,
  `tel` text NOT NULL,
  `image` text NOT NULL,
  `password` text NOT NULL,
  `type` text NOT NULL,
  `status` int(11) NOT NULL,
  `school` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `gender`, `email`, `tel`, `image`, `password`, `type`, `status`, `school`) VALUES
(1, 'This guy', 0, 'meteacher@gmail.com', '567890', 'user.png', '$2y$10$6Pltw4r/0SgLxAeM2lnJkOdgFxSivjuUwCQP.VzqCHXKxjsLpIgqO', '1', 1, 1),
(2, 'Patrick Igiraneza', 0, 'admin@gmail.com', '1234567', 'user.png', '$2y$10$Ki0FAmaApqWqmBKS2e4S3OZU9IULMglzIrF14K4HHMXlfA3f/Unay', '0', 1, 1),
(14, 'Micka Carole Nezerwa', 1, 'micka@gail.com', '456789', '', '', '1', 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `academic_year`
--
ALTER TABLE `academic_year`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `assessments`
--
ALTER TABLE `assessments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `info`
--
ALTER TABLE `info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `marks`
--
ALTER TABLE `marks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `periods`
--
ALTER TABLE `periods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `streams`
--
ALTER TABLE `streams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teaches`
--
ALTER TABLE `teaches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `academic_year`
--
ALTER TABLE `academic_year`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `assessments`
--
ALTER TABLE `assessments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `enrollment`
--
ALTER TABLE `enrollment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `info`
--
ALTER TABLE `info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `marks`
--
ALTER TABLE `marks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `periods`
--
ALTER TABLE `periods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `streams`
--
ALTER TABLE `streams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `teaches`
--
ALTER TABLE `teaches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
