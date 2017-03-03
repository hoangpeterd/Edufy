//NOT IN USE
module.exports = function(sequelize, DataTypes){
  var Students = sequelize.define("students", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    timestamps: false
  });

  return Students;
};
  