//creating a virtue table so sequelize can run properly
module.exports = function(sequelize, DataTypes){
  var Students = sequelize.define("students", {
    studentUserName: {
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
    }
  }, {
      timestamps: false
    });
    return Tutors;
}
