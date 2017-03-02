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
//Honestly, what I now is a bit shaky, but allows to send error messages to handlebars and stuff? Useful
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
      
			if (!user) {console.log('Not Registered/Incorrect Info'); return cb(null, false); }
			user = user.get({plain: true})
      
			bcrypt.compare(password, user.password, function(err, res) {
				if (!res) {console.log('Invalid Email or Password'); return cb(null, false); }
			  console.log('Should Log In');
        return cb(null, user)
			})
		})
	}
))

//If user forgets to fill an input, throw them back. Checks for existance of account, 
//if not creates them in user, and then migrates them to respective tables 
//(Only tutor, student table is nonexistent currently.)
passport.use('local-signup', new Strategy({passReqToCallback: true}, 
  function(req, username, password, cb) {
		
    db.users.findOne({where: {userName: username}}).then(function(user) {
      
			if (user) {
        console.log('User Account Exists'); 
				return cb(null, false, req.flash('signupMessage', 'Account already exists')); 
      }
			if (!(username || password || req.body.accountType || req.body.firstName || req.body.lastName)) {
				return cb(null, false, req.flash('signupMessage', 'Missing a field'));
			}
      
      bcrypt.genSalt(7, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          db.users.findOrCreate({ 
            where: {
              username: req.body.username
            },
            defaults: {
              password: hash,
							firstName: req.body.firstName,
							lastName: req.body.lastName,
              accountType: req.body.accountType
            }
          }).spread(function(user, created) {
						
            user = user.get({plain: true})
						user.password = null
						
						//Read schema for details.
            if (created && /tutor/.test(req.body.accountType)) {
              db.tutors.create({
                user_id: user.user_id,
              }).then(function() {
								
                return cb(null, user)	
              })
		        } else {return cb(null, user)}
          })
        })
      })
    })
  }
))

passport.serializeUser(function(user, cb) {
	cb(null, user.user_id);
});

passport.deserializeUser(function(id, cb) {
	db.users.findOne({where: {user_id: id}}).then(function(data) {
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

//------------------------------------------------------------------------------
//USE THIS SPOT FOR TESTING HOW SEQUELIZE WILL RETRIEVE DATA. WILL RUN FIRST.
//------------------------------------------------------------------------------
//db.users.findOne({where:{username: 'lol'}}).then(function(data) {
//  console.log(data || 'Empty data')
//})
//------------------------------------------------------------------------------


//after connecting to the DB base with sequelize, it will create a localhost so the user can view the page
db.sequelize.sync().then(function(){
	app.listen(PORT);
});
