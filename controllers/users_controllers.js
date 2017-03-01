//requiring files
const path = require("path");
const db = require("../models");
const ensureLI = require('connect-ensure-login');

//creating different routes for special events. along with that we are using the models directory (sequelize)
module.exports = function(app, passport){

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public", "index.html"));
  });

  app.get("/:user/:id", function(req, res) {
    if (req.params.user == 'student') {
      db.students.findOne({where: {studentUserName: req.params.id}}).then(function(data) {
        if (!data) {res.sendStatus(404); return true}
        data = data.get({plain: true})
        res.render('student', data)
      })
    } else if (req.params.user == 'tutor'){
      db.tutors.findOne({where: {tutorUserName: req.params.id}}).then(function(data) {
        if (!data) {res.sendStatus(404); return true}
        data = data.get({plain: true})
        res.render('tutor', data)
      })
    }
  });

  //Login needs to be looked at before presentation because that's where all the security is. SUPER IMPORTANT.
  app.post('/uploadProfileImage', function(req, res) {

    if (!req.files) {
      res.redirect('back');
      return;
    }

    let upload = req.files.imageUpload;
    let filePath = '/uploadFiles/' + req.body.user.replace(/\.|@/g,'')
    console.log(filePath)

    upload.mv(path.join(__dirname + '/../private' + filePath), function (err) {
      if (err) {res.status(500).send(err); return true;}
      else {console.log('File uploaded!')}
    })

    if (req.body.userType == 'student') {
      db.students.update({picUrl: filePath}, {where : {studentUserName: req.body.user}}).then(res.redirect('/student/' + req.body.user))

    } else {
      db.tutors.update({picUrl: filePath}, {where : {tutorUserName: req.body.user}}).then(res.redirect('/tutor/' + req.body.user))

    }
  })

  //creating a new tutor in the tutor table and sending information to redirect the page
  app.post("/signupTutor", function(req, res) {
    db.tutors.count({ where: { tutorUserName: req.body.tutorUserName } }).then(count => {
      if(count === 0){
        db.students.count({ where: { studentUserName: req.body.studentUserName } }).then(count => {
          if(count === 0){
            console.log(req.body.specificClasses);
            db.tutors.create(req.body).then(function(){
              /**
               * @todo: find out why res.direct wont work
               */
              res.send({userName: req.body.tutorUserName});
            });
          } else {
            console.log("User has been created1");
          }
        });
      } else {
        console.log("User has been created2");
      }
    });
  });

  //creating a new student in the student table and sending information to redirect the page
  app.post("/signupStudent", function(req, res) {
    db.tutors.count({ where: { tutorUserName: req.body.tutorUserName } }).then(count => {
      if(count === 0){
        db.students.count({ where: { studentUserName: req.body.studentUserName } }).then(count => {
          if(count === 0){
            db.students.create(req.body).then(function(){
              /**
               * @todo: find out why res.direct wont work
               */
              res.send({redirect: "/student/" + req.body.studentUserName});
            });
          } else {
            console.log("User has been created");
          }
        });
      } else {
        console.log("User has been created");
      }
    });
  });

  //signing into the user. and sending iformation to the Client-side so it can be redirected
  app.post("/sign-in", passport.authenticate('local', {failureRedirect: '/'}), function(req, res) {
		

  });

  //getting rating information and sending the information so the tutor has there rating
  app.post("/findRating", function (req, res) {
    db.tutors.findOne({ where: {tutorUserName: req.body.userName} }).then(function(result){
      res.send({rating: result.rating, sessions: result.sessions});
    });
  });

  app.post("/tutorAvailability", function(req, res) {
    var tutorUserName = req.body.tutorUserName;
    var date = req.body.dates[0];
    var startTimes = req.body.dates[1];

    for(var i = 2; i<req.body.dates.length; i++){
      startTimes = startTimes + ", " + req.body.dates[i] ;
    }

    var availableObj = {
      tutorUserName: tutorUserName,
      date: date,
      startTimes: startTimes
    }

    db.availability.create(availableObj).then(function(result){
      /**
       * @todo: find out why res.direct wont work
       */
      res.send({reload: true});
    });
  });

  app.post("/scheduledAppointments", function(req, res) {
    // console.log(req.body);
  });
}

//ignore these. some codes i might wanna use in the future
// ...
//     retStatus = 'Success';
//     // res.redirect('/team');
//     res.send({
//       retStatus : retStatus,
//       redirectTo: '/team',
//       msg : 'Just go there please' // this should help
//     });
// ...
// Client-side in $.post('/team/' ...
//
// ...
//     $.post('/team/' + teamId, { _method : 'delete' }, function(response) {
//         console.log(response);
//         if(response.retStatus === 'Success') {
//             // not sure what did you mean by ('/team' && '/team' !== "")
//             // if('/team' && '/team' !== "") {
//             if (response.redirectTo && response.msg == 'Just go there please') {
//                 window.location = response.redirectTo;
//             }
//         }
//     });
