CREATE DATABASE IF NOT EXISTS edufy;

USE edufy;

CREATE TABLE IF NOT EXISTS users (
	username VARCHAR(100) PRIMARY KEY NOT NULL
    , pass VARCHAR(100) NOT NULL
    , tutor_student VARCHAR(100) NOT NULL
    , rating FLOAT(12) NOT NULL DEFAULT 0
    , sessions INT(12) NOT NULL DEFAULT 0
);


#Handlebars testing
CREATE TABLE userproto (
	id integer not null primary key auto_increment,
    fullname varchar(40) not null ,
    school varchar(50) not null,
    #Send Email to grav, and store link to account image before placing. gravatarEmail would become just Gravatar.
    gravatarEmail varchar(40) not null
);