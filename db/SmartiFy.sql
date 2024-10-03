CREATE TABLE `users` (
  `id_user` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `username` varchar(255) UNIQUE NOT NULL,
  `mail` varchar(255),
  `address` varchar(255),
  `password` varchar(255) NOT NULL
);
