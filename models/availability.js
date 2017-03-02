//creating a virtue table so sequelize can run properly
module.exports = function(sequelize, DataTypes){
  var Availability = sequelize.define("availability", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tutor_id: {
      type: DataTypes.STRING,
			allowNull: false
    },
    date: {
      type: DataTypes.STRING(100),
			isAlphanumeric: true,
			allowNull: false
    },
    startTimes: {
      type: DataTypes.TEXT,
			allowNull: false
    }
  }, {
    timestamps: false
    , freezeTableName: true
  }, {
    classMethods: {
      associate: function(models) {
        Availability.belongsTo(models.tutors, {
          foreignKey: 'user_id'
        });
      }
    }
  });

  return Availability;
};
