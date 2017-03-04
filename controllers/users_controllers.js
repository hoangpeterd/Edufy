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

    req.logout();
    res.redirect('/');
  });

  app.get('/profile', ensureLogin.ensureLoggedIn('/'), function (req, res) {
    res.render(req.user.accountType, req.user);
  });

  //Supplies student with tutor list
  app.get('/class/:class', function(req, res) {
    var subject = req.params.class;
    var subjectObj = {};
    subjectObj[req.params.class] = { $ne: null };

		db.classes.findAll({raw: true, where: subjectObj}).then(function(data) {
      var tutorIDArr = [];
      var availIDArr = [];
      var tutorSub = [];
			for (let i = 0; i < data.length; i++) {
        var tutorID = {
          user_id: data[i].tutor_id
        };
        var availID = {
          tutor_id: data[i].tutor_id
        }
        var spefClass = {
          class: data[i][subject]
        };
        tutorIDArr.push(tutorID);
        availIDArr.push(availID);
        tutorSub.push(spefClass);
			}

      db.users.findAll({raw: true, where: {$or: tutorIDArr}}).then(function(data) {
        var tutorInfo = []
          console.log(data);
        for(var i = 0; i<data.length; i++){
          var tutorObj = {
            fullName: data[i].firstName + " " + data[i].lastName,
            class: tutorSub[i].class,
            picUrl: data[i].picUrl,
            id: data[i].user_id
          }
          tutorInfo.push(tutorObj);
        }


        db.tutors.findAll({raw: true, where: {$or: tutorIDArr}}).then(function(data) {


          for(var i = 0; i<data.length; i++){
            var rating = data[i].rating / data[i].sessions;

            tutorInfo[i].rating = rating;
          }


          db.availability.findAll({raw: true, where: {$or: availIDArr}}).then(function(data){
            for(var i = 0; i<data.length; i++){

            }
            console.log(data);

            res.send(tutorInfo);
          });
        });
      });
		});
	});

  app.post('/class/:class', function(req, res) {

    let a = {}
    a[req.params.class] = req.body.classList
    db.classes.update(a, {where: {tutor_id: req.user.user_id}}).then(function(results) {

      res.send(results)
    })
  })

  app.get("/favicon.ico", function (req, res) {
    res.send(204);
  });
  // Post.update({
  //  updatedAt: null,
  // }, {
  //  where: {
  //    deletedAt: {
  //      $ne: null
  //    }
  //  }
  // });
  // // UPDATE post SET updatedAt = null WHERE deletedAt NOT NULL;

  //Login needs to be looked at before presentation because that's where all the security is. SUPER IMPORTANT.
  app.post('/uploadProfileImage', function (req, res) {

    user = req.user;
    if (!req.files) {
      res.redirect('back');
      return;
    }

    let upload = req.files.imageUpload;
    let filePath = '/uploadFiles/' + user.username.replace(/\.|@/g, '') + user.user_id.toString();

    upload.mv(path.join(__dirname + '/../private' + filePath), function (err) {
      if (err) { res.status(500).send(err); return true; }
      db.users.update({ picUrl: filePath }, { where: { user_id: user.user_id } });
    });

    setTimeout(function () {
      res.redirect('/profile');
    }, 1000);

  });

  //getting rating information and sending the information so the tutor has their rating
  app.get("/findRating", function (req, res) {

    if (!req.user) {return}
    db.tutors.findOne({ where: { user_id: req.user.user_id } }).then(function (result) {
      res.send({ rating: result.rating, sessions: result.sessions });
    });
  });

  app.post("/createTutorAvailability", function (req, res) {
    var tutor_id = req.user.user_id;
    var availableObj = {};
    var availableArr = [];
    var dow = req.body.dates[0];
    for (var i = 1; i < req.body.dates.length; i++) {
      var start = req.body.dates[i];
      availableObj = {
        tutor_id: tutor_id,
        dow: dow,
        start: req.body.dates[i]
      };
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
        };
        apptArr.push(apptObj);
      };
      res.send(apptArr);
    });
  });

app.post("/tutorAvailability", function (req, res) { //Something about this one being GET did something new
  db.availability.findAll({tutor_id: req.user.user_id}).then(function (result) {
    var parsedArr = [];
    // console.log(result[0].dataValues);
    // console.log(result[1].dataValues);
    // console.log(result[2].dataValues);
for (var i = 0; i < result.length; i++) {
        availableObj = {
        title: "Available",
        start: result[i].dataValues.start
      }
        parsedArr.push(availableObj);
    }

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
};
