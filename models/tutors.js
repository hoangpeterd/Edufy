//creating a virtue table so sequelize can run properly
module.exports = function(sequelize, DataTypes){
  var Tutors = sequelize.define("tutors", {
    tutorUserName: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName{
      type: DataType.STRING
    },
    pass: {
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
    return Tutors;
}
