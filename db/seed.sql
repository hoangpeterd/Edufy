
INSERT INTO tutors (tutorUserName, firstName, lastName, pass, rating, sessions, specificClasses)
VALUES	('Tish@uh.edu', 'Tish', 'McNeel', 'TishTish', 24000, 5000, "coolness 101")
, ('Yash@uh.edu', 'Yasha', 'Meat', 'theManMeat', 3, 1, "trollness 101")
, ('CamKirk@uh.edu', 'Cam', 'Kirk', 'mrjeepercreeper', 2700, 600, "workhardPlayHard 101");

INSERT INTO students (studentUserName, firstName, lastName, pass)
VALUES ('DanTran@uh.edu', 'Dan', 'Tran', 'DanDaManTran')
, ('PetaHoang@ut.edu', 'Peter', 'Hoang', 'IamTony')
, ('R.Thiim@ut.edu', 'Rachel', 'Thiim', 'eatBagsofDicks');

INSERT INTO availability (tutorUserName, date, startTimes)
VALUES ('Tish@uh.edu', '2017-06-06', '16, 17, 18, 19')
, ('CamKirk@uh.edu', '2017-06-14', '9, 10, 11, 12')
, ('Yash@uh.edu', '2017-06-15', '01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12');

INSERT INTO appointments (tutorUserName, studentUserName, date)
VALUES ('Tish@uh.edu', 'DanTran@uh.edu', '2017-06-06T16')
, ('Tish@uh.edu', 'DanTran@uh.edu', '2017-06-06T17')
, ('Tish@uh.edu', 'DanTran@uh.edu', '2017-06-06T18')
, ('CamKirk@uh.edu', 'R.Thiim@ut.edu', '2017-06-14T09')
, ('CamKirk@uh.edu', 'R.Thiim@ut.edu', '2017-06-14T10')
, ('CamKirk@uh.edu', 'R.Thiim@ut.edu', '2017-06-14T11')
, ('Yash@uh.edu', 'PetaHoang@ut.edu', '2017-06-15T05')
, ('Yash@uh.edu', 'PetaHoang@ut.edu', '2017-06-15T06')
, ('Yash@uh.edu', 'PetaHoang@ut.edu', '2017-06-15T07')
, ('Yash@uh.edu', 'PetaHoang@ut.edu', '2017-06-15T08');
