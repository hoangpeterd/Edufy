//requiring files
const express = require("express");
const app = express();
const path = require("path");

// const db = require("../models");

//creating different routes for special events. along with that we are using the models directory (sequelize)
module.exports = function(app){
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public", "index.html"));
  });

  // app.get("/signing", function(req, res) {
  //   console.log(req)
  // });

  app.post("/signing", function(req, res) {
    console.log(req.body);
  });



	//more stuff will be added
}
