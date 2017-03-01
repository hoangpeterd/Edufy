//required npm to get this app to work
const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport');
const Strategy = require('passport-local').Strategy
const flash = require('connect-flash')
const bcrypt = require('bcryptjs');
const db = require("./models");
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static content for the app from the "public" directory in the application directory. Private stores profile images.
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/private"));

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }))
app.use(require('express-fileupload')());
app.use(flash())

app.engine('handlebars', require('express-handlebars')({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

app.use(require('express-session')({secret: 'santa', resave:false, saveUnitialized: false}))

// This sets up how passport will find and determine is valid user or not.
// The cb function will set up user on the request, meaning once logged in, 
// we can trace user through our routes with req.user
passport.use(new Strategy(
	function(username, password, cb) {
		db.users.findOne({where: {userName: username}}).then(function(user) {
      
			if (!user) {console.log('anot working'); return cb(null, false); }
			user = user.get({plain: true})
      
			bcrypt.compare(password, user.password, function(err, res) {
				if (!res) {console.log('bnot working', res); return cb(null, false); }
			  console.log('cnot working');
        return cb(null,user)
			})
		})
	}
))

passport.use(
  'local-signup', 
  new Strategy({
    passReqToCallback: true
  }, 
  function(req, username, password, cb) {
    console.log(req.body.firstName, username, password)
    db.users.findOne({where: {userName: username}}).then(function(user) {
      
			if (user) {
        console.log('anot working'); return cb(null, false, req.flash('signupMessage', 'Account already exists')); 
      }
      
      bcrypt.genSalt(7, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          db.users.findOrCreate({ 
            where: {
              username: req.body.username
            },
            defaults: {
              password: hash,
              account_type: req.body.accountType
            }
          }).spread(function(user, created) {
            user = user.get({plain: true})
            console.log('taht far', user)
            if (created) {
              db[user.account_type + 's'].create({
                studentUserName: user.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
              }).then(function(data) {
                data = data.get({plain: true})
                console.log(data)
                return cb(null, user)
              }) 
		        }
          })
        })
      })
    })
  }
))

passport.serializeUser(function(user, cb) {
	cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
	db.users.findOne({where: {id: id}}).then(function(data) {
		data = data.get({plain: true});
		cb(null, data)
	})
});

app.use(passport.initialize());
app.use(passport.session());



// const methodOverride = require("method-override");
// Override with POST having ?_method=DELETE
// app.use(methodOverride("_method"));

//requiring and calling the function that was exported from the controllers file. It will get the webpage and post it in the local host. At the same time it will listen for certain request so i can edit the DB and then refresh the page
require("./controllers/users_controllers.js")(app, passport);

//db.users.findOne({where: {id: 3}}).then(function(data) {
//	data = data.get({plain: true})
//	bcrypt.compare('lol', data.password, function(err, res) {
//	console.log(res)
//})
//})


//after connecting to the DB base with sequelize, it will create a localhost so the user can view the page
db.sequelize.sync().then(function(){
	app.listen(PORT);
});
