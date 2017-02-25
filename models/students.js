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
    lastName: {
      type: DataTypes.STRING
    },
    pass: {
      type: DataTypes.STRING
    },
    picUrl: {
      type:DataTypes.STRING
    }
  }, {
    timestamps: false
  }, {
    classMethods: {
      associate: function(models) {
        Students.hasMany(models.availability, {
          onDelete: "cascade"
        });
      }
    }
  });

  return Students;
};
