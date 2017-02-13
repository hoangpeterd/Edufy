//requiring files
const express = require("express");
const app = express();
const db = require("../models");

//creating different routes for special events. along with that we are using the models directory (sequelize)
module.exports = function(app){
  app.get("/", function(req, res) {
    db.users.findAll().then(function(result){
      res.send(result);
    });
  });

	//more stuff will be added
}
