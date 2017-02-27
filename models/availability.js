//creating a virtue table so sequelize can run properly
module.exports = function(sequelize, DataTypes){
  var Availability = sequelize.define("availability", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tutorUserName: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.STRING
    },
    startTimes: {
      type: DataTypes.TEXT
    }
  }, {
    timestamps: false
    , freezeTableName: true
  }, {
    classMethods: {
      associate: function(models) {
        Availability.belongsTo(models.tutors, {
          foreignKey: 'tutorUserName'
        });
      }
    }
  });

  return Availability;
};
