//creating a virtue table so sequelize can run properly
module.exports = function (sequelize, DataTypes) {
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
      classMethods: {
        associate: function (models) {
          Tutors.hasMany(models.availability, {
            foreignKey: {
              name: "user_id",
              onDelete: "cascade"
            }
          });
        }
      },
      timestamps: false
    });


  return Tutors;
};
