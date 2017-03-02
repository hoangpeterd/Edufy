//creating a virtue table so sequelize can run properly
module.exports = function(sequelize, DataTypes){
  var Tutors = sequelize.define("tutors", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    rating: {
      type: DataTypes.FLOAT(12),
			defaultValue: 5,
			allowNull: false
    },
    sessions: {
      type: DataTypes.INTEGER(12),
			defaultValue: 1,
			allowNull: false
    },
    liberalArts: {
      type: DataTypes.BOOLEAN,
			defaultValue: false
    },
    business: {
      type: DataTypes.BOOLEAN,
			defaultValue: false
    },
    engineering: {
      type: DataTypes.BOOLEAN,
			defaultValue: false
    },
    mathematics: {
      type: DataTypes.BOOLEAN,
			defaultValue: false
    },
    biology: {
      type: DataTypes.BOOLEAN,
			defaultValue: false
    },
    chemistry: {
      type: DataTypes.BOOLEAN,
			defaultValue: false
    },
    computerScience: {
      type: DataTypes.BOOLEAN,
			defaultValue: false
    },
    geology: {
      type: DataTypes.BOOLEAN,
			defaultValue: false
    },
    physics: {
      type: DataTypes.BOOLEAN,
			defaultValue: false
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
