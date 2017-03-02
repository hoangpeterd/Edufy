module.exports = function(sequelize, DataTypes){
  var LiberalArts = sequelize.define("liberalArts", {
    tutor_id: {
      type: DataTypes.INTEGER,
			allowNull: false,
      primaryKey: true
    },
    classes: {
      type: DataTypes.TEXT,
			isAlphanumeric: true,
			allowNull: false
    }
  }, {
    timestamps: false
  }, {
    classMethods: {
      associate: function(models) {
        LiberalArts.belongsTo(models.tutors, {
          foreignKey: 'user_id'
        });
      }
    }
  });

  return LiberalArts;
};
