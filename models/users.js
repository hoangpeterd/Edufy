//creating a virtue table so sequelize can run properly
module.exports = function(sequelize, DataTypes){
  var User = sequelize.define("users", {
    username: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      pass: {
        type: DataTypes.STRING
      },
      tutor_student: {
        type: DataTypes.STRING
      },
      rating: {
        type: DataTypes.FLOAT
      },
      sessions: {
        type: DataTypes.INTEGER
      }
    }, {
      timestamps: false
    });
    return User;
}
