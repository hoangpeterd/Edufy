//requiring files
const express = require("express");
const app = express();
const path = require("path");
const db = require("../models");

//creating different routes for special events. along with that we are using the models directory (sequelize)
module.exports = function(app){

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public", "index.html"));
  });

  app.get("/tutor", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public", "tutor.html"));
  });

  app.get("/student", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public", "student.html"));
  });

  //Page for testing out file sending. Will organize after we figure out if/how we want to separate backend files. --YASHA
  //Nodemailer for email notifications, and cookie npm package. --YASHA
  app.post('/uploadProfileImage', function(req, res) {

    upload = req.files.image;
    if (!req.files) {
      res.send('No files were uploaded');
      return;
    }
    console.log(path.join(__dirname + '/../private/uploadFiles/' + upload.name))
    upload.mv(path.join(__dirname + '/../private/uploadFiles/' + upload.name), function (err) {
      if (err) {res.status(500).send(err)}
      else {res.send('File uploaded!')}
    })
  })

  //creating a new tutor in the tutor table and sending information to redirect the page
  app.post("/signupTutor", function(req, res) {
    db.tutors.count({ where: { tutorUserName: req.body.userName } }).then(count => {
      if(count === 0){
        db.students.count({ where: { studentUserName: req.body.userName } }).then(count => {
          if(count === 0){
            console.log("User has been created");
          } else {
            db.tutors.create(req.body).then(function(){
              res.send({redirect: "/tutor"});
            });
          }
        });
      } else {
        console.log("User has been created");
      }
    });
  });

  //creating a new student in the student table and sending information to redirect the page
  app.post("/signupStudent", function(req, res) {
    db.tutors.count({ where: { tutorUserName: req.body.userName } }).then(count => {
      if(count === 0){
        db.students.count({ where: { studentUserName: req.body.userName } }).then(count => {
          if(count === 0){
            console.log("User has been created");
          } else {
            db.students.create(req.body).then(function(){
              res.send({redirect: "/student"});
            });
          }
        });
      } else {
        console.log("User has been created");
      }
    });
  });

  //signing into the user. and sending iformation to the Client-side so it can be redirected
  app.post("/signing", function(req, res) {
    db.tutors.count({ where: { tutorUserName: req.body.userName } }).then(count => {
        if (count === 0) {
          db.students.count({where: {studentUserName: req.body.userName} }).then(count => {
            if(count === 0){
              console.log("not a real user");  //going to change this console.log to do something special***********
            } else {
              db.students.findOne({ where: {studentUserName: req.body.userName} }).then(function(result) {
                if(req.body.password !== result.pass){
                  console.log("not your password"); //going to change this console.log to do something special***********
                } else {
                  res.send({redirect: "/student"});
                }
              });
            }
          });
          console.log("not a real user");  //going to change this console.log to do something special***********
        } else {
          db.tutors.findOne({ where: {tutorUserName: req.body.userName} }).then(function(result) {
            if(req.body.password !== result.pass){
              console.log("not your password"); //going to change this console.log to do something special***********
            } else {
              res.send({redirect: "/tutor"});
            }
          });
        }
    });
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
