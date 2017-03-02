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
