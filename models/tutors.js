//creating a virtue table so sequelize can run properly
module.exports = function(sequelize, DataTypes){
  var Tutors = sequelize.define("tutors", {
    username: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
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
    },
    liberalArts: {
      type: DataTypes.BOOLEAN
    },
    business: {
      type: DataTypes.BOOLEAN
    },
    engineering: {
      type: DataTypes.BOOLEAN
    },
    mathematics: {
      type: DataTypes.BOOLEAN
    },
    biology: {
      type: DataTypes.BOOLEAN
    },
    chemistry: {
      type: DataTypes.BOOLEAN
    },
    computerScience: {
      type: DataTypes.BOOLEAN
    },
    geology: {
      type: DataTypes.BOOLEAN
    },
    physics: {
      type: DataTypes.BOOLEAN
    },
    specificClasses: {
      type: DataTypes.STRING
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
