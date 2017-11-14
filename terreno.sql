-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 29-09-2017 a las 05:20:19
-- Versión del servidor: 5.7.19
-- Versión de PHP: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `terreno`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Clientes`
--

CREATE TABLE `Clientes` (
  `idCliente` int(11) NOT NULL,
  `folio_contrato` int(11) DEFAULT NULL,
  `nombre_completo` varchar(45) DEFAULT '',
  `correo` varchar(45) DEFAULT NULL,
  `telefono` varchar(45) DEFAULT NULL,
  `fecha` varchar(27) DEFAULT NULL,
  `domicilio` varchar(270) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Clientes`
--

INSERT INTO `Clientes` (`idCliente`, `folio_contrato`, `nombre_completo`, `correo`, `telefono`, `fecha`, `domicilio`) VALUES
(25, 111, 'luis castillo', 'luisyosemite@gmail.com', '5519684517', '27/05/15', 'genaro estrada 190'),
(27, 1235, 'ana mireya', 'ana@gmail.com', '5512345678', '27/01/97', 'Dexto de Victoria'),
(28, 1111, 'rott castillo', 'rott@gmail.com', '5519684517', '12/12/12', 'real toledo fase 12'),
(29, 2715, 'dolores imelda', 'dolores.i@gmail.com', '5539042761', '12/12/12', 'santa cruz'),
(31, 3234, 'Sebastian Ruiz', 'sebas@gmail.com', '5512345432', '12/12/12', 'ijijijijjiji'),
(64, 123111, 'jim catillo', 'jimcatillo@gmail.com', '5519876517', '11/11/11', 'juhygyhhyhyhy'),
(68, 6904, 'prueba', 'pruba@gmail.com', '1234567890', '11/11/11', 'jikolplokijuhygt');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Depositos`
--

CREATE TABLE `Depositos` (
  `idDeposito` int(11) NOT NULL,
  `idCliente` int(11) DEFAULT NULL,
  `folio` int(11) DEFAULT NULL,
  `auth` int(11) DEFAULT NULL,
  `clave` varchar(11) DEFAULT NULL,
  `fecha` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Depositos`
--

INSERT INTO `Depositos` (`idDeposito`, `idCliente`, `folio`, `auth`, `clave`, `fecha`) VALUES
(6, 25, 111, 222, '12/12/12', '11/11/11'),
(7, 27, 227, 127, '11/11/11', '22/22/27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `DetallesDepositos`
--

CREATE TABLE `DetallesDepositos` (
  `idDetalleDeposito` int(11) NOT NULL,
  `idDeposito` int(11) DEFAULT NULL,
  `idTerreno` int(11) DEFAULT NULL,
  `pago_ingreso` varchar(11) DEFAULT NULL,
  `pago_justificado` varchar(11) DEFAULT NULL,
  `concepto` varchar(450) DEFAULT NULL,
  `observaciones` varchar(450) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `DetallesDepositos`
--

INSERT INTO `DetallesDepositos` (`idDetalleDeposito`, `idDeposito`, `idTerreno`, `pago_ingreso`, `pago_justificado`, `concepto`, `observaciones`) VALUES
(2, 6, 7, '111', '112715', 'pago enero', 'pago enero');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `DetallesPagos`
--

CREATE TABLE `DetallesPagos` (
  `idDetallePago` int(11) NOT NULL,
  `idPago` int(11) DEFAULT NULL,
  `folio_deslinde` int(11) DEFAULT NULL,
  `deslinde` varchar(450) DEFAULT NULL,
  `folio_enganche` int(11) DEFAULT NULL,
  `enganche` varchar(11) DEFAULT NULL,
  `vencimiento_contrato` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `DetallesPagos`
--

INSERT INTO `DetallesPagos` (`idDetallePago`, `idPago`, `folio_deslinde`, `deslinde`, `folio_enganche`, `enganche`, `vencimiento_contrato`) VALUES
(1, 1, 124, 'Texto deslinde 2', 321, '1,27', '15/03/15'),
(2, 5, 121, 'pago enero', 127, '12878', '27/03/15'),
(3, 5, 878, 'Febrero', 876, '121', '15/05/14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Empleados`
--

CREATE TABLE `Empleados` (
  `idEmpleado` int(11) NOT NULL,
  `nombre` tinytext,
  `correo` varchar(45) DEFAULT NULL,
  `puesto` tinytext
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Empleados`
--

INSERT INTO `Empleados` (`idEmpleado`, `nombre`, `correo`, `puesto`) VALUES
(1, 'admin', 'admin', 'Administrador'),
(2, 'Ana Mireya', 'anamireya@gmail.com', 'Secretaria'),
(3, 'Rott Castillo', 'rott@gmail.com', 'Vendedor'),
(4, 'root', 'root@gmail.com', 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Pagos`
--

CREATE TABLE `Pagos` (
  `idPago` int(11) NOT NULL,
  `idTerreno` int(11) DEFAULT NULL,
  `idCliente` int(11) DEFAULT NULL,
  `folio_contrato` int(11) DEFAULT NULL,
  `fecha` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Pagos`
--

INSERT INTO `Pagos` (`idPago`, `idTerreno`, `idCliente`, `folio_contrato`, `fecha`) VALUES
(4, 7, 25, 123, '27/04/15'),
(5, 8, 27, 111, '19/10/17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Recursos`
--

CREATE TABLE `Recursos` (
  `idRecurso` int(11) NOT NULL,
  `titulo` tinytext,
  `tipo` varchar(11) DEFAULT NULL,
  `imagenpeque` varchar(450) DEFAULT NULL,
  `imagengrande` varchar(450) DEFAULT NULL,
  `contenido` varchar(450) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Recursos`
--

INSERT INTO `Recursos` (`idRecurso`, `titulo`, `tipo`, `imagenpeque`, `imagengrande`, `contenido`) VALUES
(1, 'Prueba 1', 'video', 'p2017092700112.jpg', '1056KWzYYX4', 'jijijijiji');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Terreno`
--

CREATE TABLE `Terreno` (
  `idTerreno` int(11) NOT NULL,
  `idCliente` int(11) DEFAULT NULL,
  `nombre` varchar(27) DEFAULT NULL,
  `lote` int(11) DEFAULT NULL,
  `manzana` int(11) DEFAULT NULL,
  `costo` varchar(11) DEFAULT NULL,
  `disponibilidad` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Terreno`
--

INSERT INTO `Terreno` (`idTerreno`, `idCliente`, `nombre`, `lote`, `manzana`, `costo`, `disponibilidad`) VALUES
(7, 0, 'Lote 1 y Mza 1', 1, 1, '1,2715', 'Si'),
(8, 25, 'Lote 1 y Mza 2', 1, 2, '1,7251', 'No');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuarios`
--

CREATE TABLE `Usuarios` (
  `idUsuarios` int(11) UNSIGNED NOT NULL,
  `usuario` varchar(270) DEFAULT NULL,
  `contrasena` varchar(270) DEFAULT NULL,
  `tipo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `Usuarios`
--

INSERT INTO `Usuarios` (`idUsuarios`, `usuario`, `contrasena`, `tipo`) VALUES
(1, 'admin', '$2y$15$21UJJmM3ECt3KNvVsIcRdO52/XvCnBTn.HBwjlfPLwlW5Q0CBf1yS', 0),
(25, 'luisyosemite@gmail.com', '$2y$15$32PCxbjqrs.MQfRF2HicP.gKCuEXhxPrIUasvXHLFXUOnbVwq76SS', 3),
(26, 'anamireya@gmail.com', '$2y$15$9nT/Y1UzcxjTJ.chCeQMUuS5WLNyu0Jhr4HpcqNTjNWfixCQZ470u', 1),
(27, 'ana@gmail.com', '$2y$15$SfyMeAzcAANpmAXRTphrX.q29eTfzgRoomD/XnNiP7KKcjjePA6a.', 3),
(28, 'rott@gmail.com', '$2y$15$2htveW6GSmpkxZYBRtgP5efYFoI9.69caYIHiBSPksAk4ONy/dYJ.', 2),
(29, 'dolores.i@gmail.com', '$2y$15$89rfwXfkXnefWslvr6bw2u/X4ckByEFGkarmYRXe00NKb9wNjr6eS', 3),
(30, 'jim@gmail.com', '$2y$15$.X2C4D0vwCYbdCD4aHTX7.hwokCR6oo63xY1mr.PixQM/zkuDDDn6', 3),
(31, 'sebas@gmail.com', '$2y$15$fnyQtO2Sxy1cSfFpAgocV.HPYnui73vaabEzEkNvxtxuuN5Mlh6eW', 3),
(32, 'prueba@gmail.com', '$2y$15$vxsA70MOC342M2vb3lku2epcqx7wLeBSq604aKwxti/Q6SCk02a1a', 3),
(33, 'prueba2@gmail.com', '$2y$15$DncTztWayV6qvObz.AC57efX0nAIwotbf99U/TFXDhGSUpCjDwIvm', 3),
(34, 'prueba@gmail.com', '$2y$15$UJcMKyTsNbnSLv6HSdNamuU.f1VQE0XnouYeYb0BlX5wZe6LOFpla', 3),
(35, 'prueba2@gmail.com', '$2y$15$oOO2TpvLAKwxMr6KYwZ5TOxFopsrsHiWk3aHfvsfzG4pQbc2Vd1b.', 3),
(36, 'kkk@gmail.com', '$2y$15$Vp5TOec2hP7Xmgfbp6OiSu3Os74otBQKVlKFWghl9fcxRmuqgMUGm', 3),
(37, 'kkk@gmail.com', '$2y$15$HvfY.DU.lU2ImeNdZyeJ1OtgDLeW6OVvEKUzX5qskK76a1P.SJ21q', 3),
(38, 'prueba1@gmail.com', '$2y$15$r1Y/bztReoENCFlbQ9oZ.OyBOS6s.pgwLyU4J9Oi7y1EjQC8z/Huu', 3),
(39, 'aaa@gmail.com', '$2y$15$aXzF66BCKGxl92o6VynOsuAZ7eYZd9SS28Vr8JpSgXQK6HnFF2UuK', 3),
(40, 'luis@gmail.com', '$2y$15$2.Bhs9K.ITP2odLImOw5u.kuXF9FYJoNzJ1Nu0rVq1FiTaJMVj9RW', 3),
(41, 'prueba15@gmail.com', '$2y$15$SPS4lv2l6Xlm0NGlm0TYB.e0qm4yL0LUt40SdhI3fa2ew2zcO/dMW', 3),
(42, 'prueba72@gmail.com', '$2y$15$Zlm8BYcI2GN5RU8B4NARseyxONB8IbggbX8ahgtWWVWGBWDVd/TEm', 3),
(43, 'ppp@gmail.com', '$2y$15$/RKn.MMBC8TBNXsNlF4M.uWJY4iQbN4mL6ThNoCJ42r3VgE1txVPO', 3),
(44, 'ppp@gmail.com', '$2y$15$ZasjUrDxE7QMzZlTkp7vreYqUAyniaubviiCMY4Gk0uKiDIGC5S0m', 3),
(45, 'pkp@gmail.com', '$2y$15$jM0wCYbRWENNfPOlPaIneetym7op1AbSCHCtyfMcxnxQDzQ4JRd/a', 3),
(46, 'kiki@g.com', '$2y$15$Lv51Un.nQetmFGLl5nU12ezWndCG7sgjoy/JR3qo6S/GTmsqDNXR.', 3),
(47, 'kuku@gm.com', '$2y$15$i/7X7mUmGQyue4UmPFPflOicW7cQNY05byIlFRJU87IfENYAlZK3.', 3),
(48, 'kiju@g.com', '$2y$15$imzqxPWgRsaqrOXZV7zSseiRsKAP4WG5R2GKlrm1bEoVYSRSGYcfW', 3),
(49, 'kikii@g.com', '$2y$15$HivBgl3CYMAaPGsK0Xx7v.sE54Vy0ROvdbIcetMWUzi3llb.vopH.', 3),
(50, 'kikiki@ki.com', '$2y$15$NvggH6WJ38ZfluGYFsEhSeqhQA/4PG/FroD8qbu.MZCmM7C6h4qdG', 3),
(51, 'kiki@g.com', '$2y$15$pUee1meNTyDjLWW2pxvZwOppA2xKemtUgwf8GdPAfUT1DyHGJN8D2', 3),
(52, 'kijioi@g.com', '$2y$15$YPwD3cb4X61w/QDCuyaG8eYD0nZB6gZzw1pOvQBXYJ/sS2f0p3k9a', 3),
(53, 'koolo@g.com', '$2y$15$oY6GlqtwaA/rVp/uGfgfc.SzeMHLZXKyDUJk5xnPbiEGoF13tNKye', 3),
(54, 'jijijijii@gygygy.com', '$2y$15$gUzp0pT.Pg4VEgsuvqa9.uIPXc4qlZjHrk.Zn0UNdwF0gx41HRfwa', 3),
(55, 'kikiki@gmail.com', '$2y$15$Oxt2DMF.a3sHWwyM6JTwTOJX/yXrF8DIuQHLYhEROh4a4ZNaVfhgm', 3),
(56, 'prueba2715@gmail.com', '$2y$15$.LAwyYiINJW87ngWAmOmzOl2d5VrVqjMwenhBHkj99ggjiNP15x9K', 3),
(57, 'rott@gmail.com', '$2y$15$dbbh2ibrpi.nyAb9tmo2ZOvCyy4pPg/ZhzSUK2jt4p81L2FR/sXF6', 2),
(59, 'prueba@gmail.com', '$2y$15$jaNFMcmMDBg9pHf1obOYA.J4ukMRH4iMkwPuPygEV6ENCLZ2xYAFy', 3),
(60, 'root@gmail.com', '$2y$15$xgcQTGqLxBdprniiLtxuRePaWsg5vmIY.RHMhU8XNTdArI3rzHNA6', 0),
(61, 'prueba@gmail.com', '$2y$15$dzXteskbmzizefKmfgR9hepu7YFSd1SxOZBuNRnnsrE4fx4LaDhVS', 3),
(62, 'jijiji@ijiji.com', '$2y$15$2OfO4pAu5D/77Ta/KS2/Ne51naU6wkqcmjw3I4FceigCfd26YoUfe', 3),
(63, 'jimbb@gmail.com', '$2y$15$1kxodvtY2tdKJrPcM1MjTeV6qkopy/PiHeLcBKIKM3kYv.XU/HpGm', 3),
(64, 'jimcatillo@gmail.com', '$2y$15$PfQHMWdl.kI2zrxDkaCLtuRGwP1ikk58bnFto43zMhaTthgvOgBWq', 3),
(65, 'kikiki@gma.com', '$2y$15$Lr7XAr5vlB9cMMFrPRR4wORM/2VrJFJTc44hnBgYzAbTc/UnvqQFK', 3),
(66, 'kijikij@gi.com', '$2y$15$XqJfpizgxdfYv4QiEbs04uNbXADsVckmxKPXZnVp3OU1ttu/MucJO', 3),
(67, 'prueb@gmail.com', '$2y$15$VQIEjXx9.OyF6/Eq9ocah.bUHhtaNt1KTS8OGOW29TXCEo2FAlUNS', 3),
(68, 'pruba@gmail.com', '$2y$15$YVms6WAhQ3NsEPwWGN9jZundnc4HFT.ME7To3YrSMUIt0n0NAAmB6', 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Clientes`
--
ALTER TABLE `Clientes`
  ADD PRIMARY KEY (`idCliente`);

--
-- Indices de la tabla `Depositos`
--
ALTER TABLE `Depositos`
  ADD PRIMARY KEY (`idDeposito`);

--
-- Indices de la tabla `DetallesDepositos`
--
ALTER TABLE `DetallesDepositos`
  ADD PRIMARY KEY (`idDetalleDeposito`);

--
-- Indices de la tabla `DetallesPagos`
--
ALTER TABLE `DetallesPagos`
  ADD PRIMARY KEY (`idDetallePago`);

--
-- Indices de la tabla `Empleados`
--
ALTER TABLE `Empleados`
  ADD PRIMARY KEY (`idEmpleado`);

--
-- Indices de la tabla `Pagos`
--
ALTER TABLE `Pagos`
  ADD PRIMARY KEY (`idPago`);

--
-- Indices de la tabla `Recursos`
--
ALTER TABLE `Recursos`
  ADD PRIMARY KEY (`idRecurso`);

--
-- Indices de la tabla `Terreno`
--
ALTER TABLE `Terreno`
  ADD PRIMARY KEY (`idTerreno`);

--
-- Indices de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD PRIMARY KEY (`idUsuarios`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Depositos`
--
ALTER TABLE `Depositos`
  MODIFY `idDeposito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `DetallesDepositos`
--
ALTER TABLE `DetallesDepositos`
  MODIFY `idDetalleDeposito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `DetallesPagos`
--
ALTER TABLE `DetallesPagos`
  MODIFY `idDetallePago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Empleados`
--
ALTER TABLE `Empleados`
  MODIFY `idEmpleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `Pagos`
--
ALTER TABLE `Pagos`
  MODIFY `idPago` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `Recursos`
--
ALTER TABLE `Recursos`
  MODIFY `idRecurso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `Terreno`
--
ALTER TABLE `Terreno`
  MODIFY `idTerreno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `Usuarios`
--
ALTER TABLE `Usuarios`
  MODIFY `idUsuarios` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
