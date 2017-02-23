//required npm to get this app to work
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require('express-handlebars')
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static content for the app from the "public" directory in the application directory.


//const fileUpload = require('express-fileupload')

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }))

app.use(express.static(__dirname + "/public"));
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
;


//Ultimate decision pending on uploads -> app.use(fileUpload());

// const methodOverride = require("method-override");
// Override with POST having ?_method=DELETE
// app.use(methodOverride("_method"));

//requiring and calling the function that was exported from the controllers file. It will get the webpage and post it in the local host. At the same time it will listen for certain request so i can edit the DB and then refresh the page
require("./controllers/users_controllers.js")(app);

const db = require("./models");

//after connecting to the DB base with sequelize, it will create a localhost so the user can view the page
db.sequelize.sync().then(function(){
	app.listen(process.env.PORT || 5000);
});
