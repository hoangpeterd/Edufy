CREATE DATABASE IF NOT EXISTS edufy;

USE edufy;

CREATE TABLE IF NOT EXISTS users (
	user_id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(65) NOT NULL,
	firstName VARCHAR(12) NOT NULL,
  lastName VARCHAR(20) NOT NULL,
	picUrl VARCHAR(100) DEFAULT NULL,
  accountType SET('student', 'tutor') NOT NULL
);

CREATE TABLE IF NOT EXISTS tutors (
	user_id INTEGER PRIMARY KEY NOT NULL,
  rating FLOAT(12) NOT NULL DEFAULT 5,
  sessions INT(12) NOT NULL DEFAULT 1,
  liberalArts BOOLEAN NOT NULL DEFAULT FALSE,
  business BOOLEAN NOT NULL DEFAULT FALSE,
  engineering BOOLEAN NOT NULL DEFAULT FALSE,
  mathematics BOOLEAN NOT NULL DEFAULT FALSE,
  biology BOOLEAN NOT NULL DEFAULT FALSE,
  chemistry BOOLEAN NOT NULL DEFAULT FALSE,
  compSci BOOLEAN NOT NULL DEFAULT FALSE,
  geology BOOLEAN NOT NULL DEFAULT FALSE,
  physics BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY fk_tutor_user (user_id) REFERENCES users(user_id)
);

#CREATE TABLE IF NOT EXISTS students (
	#user_id PRIMARY KEY NOT NULL,
  #FOREIGN KEY fk_students_user (user_id) REFERENCES users(user_id)
	
	#Would be awesome if we could figure out stuff the students could have. Table looks small :(
	#Actually there is a lot I could think of, but implementation time at this point = Eh.
	
#);

CREATE TABLE IF NOT EXISTS availability (
  tutor_id INTEGER PRIMARY KEY NOT NULL,
  date VARCHAR(100) NOT NULL,
  startTimes TEXT NOT NULL,
  FOREIGN KEY fk_avail_tutor (tutor_id) REFERENCES tutors (user_id)
);

CREATE TABLE IF NOT EXISTS appointments (
  app_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  tutor_id INTEGER NOT NULL,
  student_id INTEGER NOT NULL,
  subject VARCHAR(100) NOT NULL,
  date VARCHAR(100) NOT NULL,
  FOREIGN KEY fk_app_tutors (tutor_id) REFERENCES tutors (user_id)
  #FOREIGN KEY fk_app_students (student_id) REFERENCES students (user_id)
);

CREATE TABLE IF NOT EXISTS liberalArts (
	tutor_id INTEGER PRIMARY KEY NOT NULL,
	classes VARCHAR(100) NOT NULL,
	FOREIGN KEY fk_tutor_ (tutor_id) REFERENCES tutors (user_id)
);

CREATE TABLE IF NOT EXISTS business (
	tutor_id INTEGER PRIMARY KEY NOT NULL,
	classes VARCHAR(100) NOT NULL,
	FOREIGN KEY fk_tutor_ (tutor_id) REFERENCES tutors (user_id)
);

CREATE TABLE IF NOT EXISTS engineering (
	tutor_id INTEGER PRIMARY KEY NOT NULL,
	classes VARCHAR(100) NOT NULL,
	FOREIGN KEY fk_tutor_ (tutor_id) REFERENCES tutors (user_id)
);

CREATE TABLE IF NOT EXISTS biology (
	tutor_id INTEGER PRIMARY KEY NOT NULL,
	classes VARCHAR(100) NOT NULL,
	FOREIGN KEY fk_tutor_ (tutor_id) REFERENCES tutors (user_id)
);

CREATE TABLE IF NOT EXISTS mathematics (
	tutor_id INTEGER PRIMARY KEY NOT NULL,
	classes VARCHAR(100) NOT NULL,
	FOREIGN KEY fk_tutor_ (tutor_id) REFERENCES tutors (user_id)
);

CREATE TABLE IF NOT EXISTS geology (
	tutor_id INTEGER PRIMARY KEY NOT NULL,
	classes VARCHAR(100) NOT NULL,
	FOREIGN KEY fk_tutor_ (tutor_id) REFERENCES tutors (user_id)
);

CREATE TABLE IF NOT EXISTS chemistry (
	tutor_id INTEGER PRIMARY KEY NOT NULL,
	classes VARCHAR(100) NOT NULL,
	FOREIGN KEY fk_tutor_ (tutor_id) REFERENCES tutors (user_id)
);

CREATE TABLE IF NOT EXISTS physics (
	tutor_id INTEGER PRIMARY KEY NOT NULL,
	classes VARCHAR(100) NOT NULL,
	FOREIGN KEY fk_tutor_ (tutor_id) REFERENCES tutors (user_id)
);

CREATE TABLE IF NOT EXISTS compSci (
	tutor_id INTEGER PRIMARY KEY NOT NULL,
	classes VARCHAR(100) NOT NULL,
	FOREIGN KEY fk_tutor_ (tutor_id) REFERENCES tutors (user_id)
);
