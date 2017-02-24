CREATE DATABASE IF NOT EXISTS edufy;

USE edufy;

CREATE TABLE IF NOT EXISTS tutors (
	tutorUserName VARCHAR(100) PRIMARY KEY NOT NULL
	, firstName VARCHAR(100) NOT NULL
	, lastName VARCHAR(100) NOT NULL
  , pass VARCHAR(100) NOT NULL
  , rating FLOAT(12) NOT NULL DEFAULT 5
  , sessions INT(12) NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS students (
	studentUserName VARCHAR(100) PRIMARY KEY NOT NULL
	, firstName VARCHAR(100) NOT NULL
	, lastName VARCHAR(100) NOT NULL
  , pass VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS availability (
	id INT (12) PRIMARY KEY NOT NULL AUTO_INCREMENT
	, tutorUserName VARCHAR(100) NOT NULL FOREIGN KEY
	, date VARCHAR(100) NOT NULL
	, schedule VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS appointments (
	id INT (12) PRIMARY KEY NOT NULL AUTO_INCREMENT
	, tutorUserName VARCHAR(100) NOT NULL FOREIGN KEY
	, studentUserName VARCHAR(100) NOT NULL FOREIGN KEY
	, date VARCHAR(100) NOT NULL
);

#Handlebars testing
CREATE TABLE userproto (
	id integer not null primary key auto_increment,
    fullname varchar(40) not null ,
    school varchar(50) not null,
    #Send Email to grav, and store link to account image before placing. gravatarEmail would become just Gravatar.
    gravatarEmail varchar(40) not null
);
