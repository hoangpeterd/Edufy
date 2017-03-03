//creating a virtue table so sequelize can run properly
module.exports = function(sequelize, DataTypes){
  var Appointments = sequelize.define("appointments", {
    app_id: {
      type: DataTypes.INTEGER,
			autoIncrement: true,
      primaryKey: true
    },
    tutor_id: {
      type: DataTypes.INTEGER,
			allowNull: false
    },
    student_id: {
      type: DataTypes.INTEGER,
			allowNull: false
    },
    date: {
      type: DataTypes.STRING(100),
			allowNull: false
    },
    subject: {
      type: DataTypes.STRING(100),
			allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Appointments.belongsTo(models.tutors, {
          foreignKey: 'user_id'
        
        });
      }
    },
    timestamps: false
  });

  return Appointments;
};
