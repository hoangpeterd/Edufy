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
    start: {
      type: DataTypes.STRING,
			allowNull: false
    },
    dow: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  }, {
    classMethods: {
      associate: function(models) {
        Availability.belongsTo(models.tutors, {
          foreignKey: {
            name:'tutor_id',
            allowNull: false
          }  
        });
      }
    },
    timestamps: false
  });

  return Availability;
};
