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
-- Estructura de tabla para la tabla `frases_motivadoras`
--

CREATE TABLE `frases_motivadoras` (
  `id` int(11) NOT NULL,
  `frase` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `veces_utilizada` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `frases_motivadoras`
--

INSERT INTO `frases_motivadoras` (`id`, `frase`, `fecha`, `veces_utilizada`) VALUES
(1, 'La persistencia es la clave del éxito.', '2024-01-31', 0),
(2, 'Cada logro comienza con la decisión de intentarlo.', '2024-01-31', 0),
(3, 'El único modo de hacer un gran trabajo es amar lo que haces.', '2024-01-31', 0),
(4, 'No importa lo lento que vayas, siempre y cuando no te detengas.', '2024-01-31', 0),
(5, 'La vida es como una bicicleta, para mantener el equilibrio, debes seguir adelante.', '2024-01-31', 0),
(6, 'Cada día es una nueva oportunidad para cambiar tu vida.', '2024-01-31', 0),
(7, 'El único modo de hacer un gran trabajo es amar lo que haces.', '2024-01-31', 0),
(8, 'La felicidad es una dirección, no un lugar.', '2024-01-31', 0),
(9, 'El único límite para nuestros logros de mañana está en nuestras dudas de hoy.', '2024-01-31', 0);

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
('1', 'secret123', 'David', 'Tous', 'Rodriguez', 'david@tous.com', 'Desarrollo de aplicaciones Web (DAW)', 2, 1),
('2', 'secret123', 'Andres', 'Martinez', 'Gual', 'andres@martinez.com', 'Desarrollo de aplicaciones Web (DAW)', 2, 1),
('3', 'secret123', 'Migel', 'Orts', 'Blaya', 'miguel@orts.com', 'Desarrollo de aplicaciones Web (DAW)', 2, 1),
('4', 'secret123', 'Marc', 'Morlá', 'Isern', 'marc@morla.com', 'Desarrollo de aplicaciones Web (DAW)', 2, 1),
('5', 'secret123', 'Tomas', 'Carrasco', 'Battauz', 'tomas@carrasco.com', 'Desarrollo de aplicaciones Web (DAW)', 2, 1),
('6', 'secret123', 'Hugo', 'Serra', 'Ruiz', 'hugo@serra.com', 'Desarrollo de aplicaciones Web (DAW)', 2, 1);

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
