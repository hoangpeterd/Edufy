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
    lastName: {
      type: DataTypes.STRING
    },
    pass: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.FLOAT
    },
    sessions: {
      type: DataTypes.INTEGER
    },
    picUrl: {
      type:DataTypes.STRING
    }
  }, {
    timestamps: false
  }, {
    classMethod:{
      associate: function(models) {
        Tutors.hasMany(model.availability, {
          onDelete: "cascade"
        });
      }
    }
  });

  return Tutors;
};
