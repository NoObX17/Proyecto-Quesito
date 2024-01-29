-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-01-2024 a las 08:31:21
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cesur`
--
CREATE DATABASE IF NOT EXISTS `cesur` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `cesur`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `DNI` varchar(9) NOT NULL,
  `password` varchar(20) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido1` varchar(20) NOT NULL,
  `apellido2` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `ciclo` varchar(100) NOT NULL,
  `curso` int(11) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`DNI`, `password`, `nombre`, `apellido1`, `apellido2`, `email`, `ciclo`, `curso`, `estado`) VALUES
('111222333', 'secret123', 'Eva', 'Evans', 'Miller', 'eva.e@example.com', 'Chemistry', 2, 1),
('123456789', 'password123', 'John', 'Doe', 'Smith', 'john.doe@example.com', 'Computer Science', 1, 1),
('555111222', 'myp@ss', 'Alice', 'Anderson', 'Brown', 'alice.a@example.com', 'Mathematics', 3, 1),
('987654321', 'securepass', 'Jane', 'Johnson', 'Williams', 'jane.j@example.com', 'Electrical Engineering', 2, 1),
('999888777', 'strongpass', 'Bob', 'Baker', 'Jones', 'bob.b@example.com', 'Physics', 1, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`DNI`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
