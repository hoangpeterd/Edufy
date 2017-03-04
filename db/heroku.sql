CREATE TABLE `appointments` (
  `app_id` int(11) NOT NULL AUTO_INCREMENT,
  `tutor_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `date` varchar(100) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `tutorUserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`app_id`),
  KEY `tutorUserId` (`tutorUserId`)
);

CREATE TABLE `availabilities` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tutor_id` varchar(255) NOT NULL,
  `start` varchar(255) NOT NULL,
  `dow` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `tutorUserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tutorUserId` (`tutorUserId`)
);

CREATE TABLE `classes` (
  `tutor_id` int(11) NOT NULL,
  `liberalArts` varchar(130) DEFAULT NULL,
  `business` varchar(130) DEFAULT NULL,
  `engineering` varchar(130) DEFAULT NULL,
  `mathematics` varchar(130) DEFAULT NULL,
  `biology` varchar(130) DEFAULT NULL,
  `chemistry` varchar(130) DEFAULT NULL,
  `compSci` varchar(130) DEFAULT NULL,
  `geology` varchar(130) DEFAULT NULL,
  `physics` varchar(130) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `tutorUserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`tutor_id`),
  KEY `tutorUserId` (`tutorUserId`)
);

CREATE TABLE `tutors` (
  `user_id` int(11) NOT NULL,
  `rating` float NOT NULL DEFAULT '5',
  `sessions` int(12) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`user_id`)
);

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(65) NOT NULL,
  `firstName` varchar(15) NOT NULL,
  `lastName` varchar(15) NOT NULL,
  `picUrl` varchar(100) DEFAULT NULL,
  `accountType` enum('student','tutor') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `tutorUserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `tutorUserId` (`tutorUserId`)
);
