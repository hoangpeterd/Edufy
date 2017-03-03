//requiring files
const path = require("path");
const db = require("../models");
const bcrypt = require("bcryptjs");
const ensureLogin = require('connect-ensure-login');

//creating different routes for special events. along with that we are using the models directory (sequelize)
module.exports = function (app, passport) {

  app.get("/", function (req, res) {

    res.sendFile(path.join(__dirname + "/../public", "dex.html"));
  });

  //If incorrect/false info, will refresh page, maybe tooltips, something else; upon correct info
  //will redirect to index page with user info, making index dynamic.
  app.post("/sign-in", passport.authenticate('local', { successRedirect: '/profile', failureRedirect: '/', failureFlash: true }));

  //creating a new tutor in the tutor table and sending information to redirect the page
  app.post("/sign-up", passport.authenticate('local-signup', { successRedirect: '/profile', failureRedirect: '/', failureFlash: true }));

  app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })

  app.get('/profile', ensureLogin.ensureLoggedIn('/'), function (req, res) {

    //	console.log(req.user);

    res.render(req.user.accountType, req.user);
  });

  app.get("/favicon.ico", function (req, res) {
    res.send(204);
  });

  //Login needs to be looked at before presentation because that's where all the security is. SUPER IMPORTANT.
  app.post('/uploadProfileImage', function (req, res) {

    user = req.user;
    if (!req.files) {
      res.redirect('back');
      return;
    }

    let upload = req.files.imageUpload;
    let filePath = '/uploadFiles/' + user.username.replace(/\.|@/g, '') + user.user_id.toString()
 
    upload.mv(path.join(__dirname + '/../private' + filePath), function (err) {
      if (err) { res.status(500).send(err); return true; }
      db.users.update({ picUrl: filePath }, { where: { user_id: user.user_id } })
    })

    setTimeout(function () {
      res.redirect('/profile')
    }, 1000)

  })

  //getting rating information and sending the information so the tutor has their rating
  app.post("/findRating", function (req, res) {
    db.tutors.findOne({ where: { user_id: req.user.user_id } }).then(function (result) {
      res.send({ rating: result.rating, sessions: result.sessions });
    });
  });

  app.post("/createTutorAvailability", function (req, res) {
    var tutor_id = req.user.user_id;
    var availableObj = {};
    var availableArr = [];
    var dow = req.body.dates[0];
    for(var i = 1; i < req.body.dates.length; i++) {
      var start = req.body.dates[i];
      availableObj = {
        tutor_id: tutor_id,
        dow: dow,
        start: req.body.dates[i]
      }
      availableArr.push(availableObj);
    }

    db.availability.bulkCreate(availableArr).then(function (result) {
      res.send({ reload: true });
    });
});

app.post("/scheduledAppointments", function (req, res) {
  db.appointments.findAll({ where: req.body }).then(function (result) {
    var apptArr = [];
    for (var i = 0; i < result.length; i++) {
      var startDate = new Date(result[i].dataValues.date);
      var endDate = new Date(result[i].dataValues.endTimes);
      var subject = result[i].dataValues.subject;
      var apptObj = {
        title: (result[i].dataValues.tutor_id + ", " + result[i].dataValues.student_id),
        subject: subject,
        start: startDate.toISOString('YYYY-MM-DD H:mm:ss'),
        end: startDate.toISOString('YYYY-MM-DD H:mm:ss')
      }
      apptArr.push(apptObj)
    }
    res.send(apptArr);
  });
});

app.post("/tutorAvailability", function (req, res) { //Something about this one being GET did something new
  db.availability.findAll({tutor_id: req.user.user_id}).then(function (result) {
    var parsedArr = [];
    for (var i = 0; i < result.length; i++) {
        var dow = result[i].dataValues.dow;
        var start = result[i].dataValues.start;
        var holdObj = {
          start: start,
          dow: dow,
          title: "Available"
        }
        parsedArr.push(holdObj);
    }

    console.log(parsedArr);
    res.send(parsedArr);
  });
});

app.use(function (req, res) {
  res.sendStatus(404);
});

app.delete("/tutorAvailability/:id", function (req, res) {
  db.availability.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (result) {
    // console.log(done);
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
