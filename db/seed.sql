#LOOK INTO MYSQL SET(data type). ALlows user to be student, tutor, or both.

INSERT INTO users (username, pass, tutor_student, rating, sessions)
VALUES ('DanTran@uh.edu', 'DanDaManTran', 'student', 0, 0)
, ('Tish@uh.edu', 'TishTish', 'tutor', 24000, 5000)
, ('PetaHoang@ut.edu', 'IamTony', 'student', 0, 0)
, ('R.Thiim@ut.edu', 'eatBagsofDicks', 'student', 0, 0)
, ('Yash@uh.edu', 'theManMeat', 'tutor', 3, 1)
, ('CamKirk@uh.edu', 'mrjeepercreeper', 'tutor', 2700, 600);

#handlebars testing
INSERT INTO userProto VALUES 
(null, 'Rach El', 'University of Southern California', 'yashanyou@gmail.com'), 
(null, 'Ya Sha', 'University of Houston', 'yashanyou@gmail.com'), 
(null, 'Pe Ter', 'University of Baltimore', 'yashanyou@gmail.com'), 
(null, 'Da aaady', 'University of Chicago', 'yashanyou@gmail.com')