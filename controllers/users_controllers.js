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

  //creating a new tutor in the tutor table
  app.post("/signupTutor", function(req, res) {
    db.tutors.create(req.body).then(function(){
      res.redirect("/");
    });
  });

  //creating a new student in the student table
  app.post("/signupStudent", function(req, res) {
    db.students.create(req.body).then(function(){
      res.redirect("/");
    });
  });

  //signing into the user. Haven't done much after they sign in correctly yet.
  app.post("/signing", function(req, res) {
    db.users.count({ where: { username: req.body.userName } })
      .then(count => {
        if (count === 0) {
          console.log("not a real user");  //going to change this console.log to do something special***********
        } else {
          db.users.findOne({ where: {username: req.body.userName} }).then(function(result) {
            if(req.body.password !== result.pass){
              console.log("not your password"); //going to change this console.log to do something special***********
            } else {
              console.log("Welcome " + req.body.userName); //going to change this console.log to do something special***********
            }
          })
        }
    });
  });
}
