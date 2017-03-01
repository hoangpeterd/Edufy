
INSERT INTO tutors (username, firstName, lastName, rating, sessions, specificClasses)
VALUES	('Tish@uh.edu', 'Tish', 'McNeel', 24000, 5000, 'coolness 101'),
('Yash@uh.edu', 'Yasha', 'Meat', 3, 1, 'trollness 101'),
('CamKirk@uh.edu', 'Cam', 'Kirk', 2700, 600, 'workhardPlayHard 101');

INSERT INTO students (username, firstName, lastName)
VALUES ('DanTran@uh.edu', 'Dan', 'Tran';),
('PetaHoang@ut.edu', 'Peter', 'Hoang'),
('R.Thiim@ut.edu', 'Rachel', 'Thiim');

INSERT INTO availability (tutorUserName, date, startTimes)
VALUES ('Tish@uh.edu', '2017-06-06', '16:00:00, 17:00:00, 18:00:00, 19:00:00'),
('CamKirk@uh.edu', '2017-06-14', '09:00:00, 10:00:00, 11:00:00, 12:00:00'),
('Yash@uh.edu', '2017-06-15', '01:00:00, 02:00:00, 03:00:00, 04:00:00, 05:00:00, 06:00:00, 07:00:00, 08:00:00, 09:00:00, 10:00:00, 11:00:00, 12:00:00');


INSERT INTO appointments (tutorUserName, studentUserName, subject, date)
VALUES ('Tish@uh.edu', 'DanTran@uh.edu', 'business', '2017-02-28T10:30:00),
('Tish@uh.edu', 'DanTran@uh.edu', 'liberalArts', '2017-06-06T17:00:00'),
('Tish@uh.edu', 'DanTran@uh.edu', 'engineering', '2017-06-06T18:00:00'),
('CamKirk@uh.edu', 'R.Thiim@ut.edu', 'mathematics', '2017-06-14T09:00:00'),
('CamKirk@uh.edu', 'R.Thiim@ut.edu', 'biology', '2017-06-14T10:00:00'),
('CamKirk@uh.edu', 'R.Thiim@ut.edu', 'computerScience', '2017-06-14T11:00:00'),
('Yash@uh.edu', 'PetaHoang@ut.edu', 'geography', '2017-06-15T05:00:00'),
('Yash@uh.edu', 'PetaHoang@ut.edu', 'physics', '2017-06-15T06:00:00'),
('Yash@uh.edu', 'PetaHoang@ut.edu', 'business', '2017-06-15T07:00:00'),
('Yash@uh.edu', 'PetaHoang@ut.edu', 'engineering', '2017-06-15T08:00:00');

