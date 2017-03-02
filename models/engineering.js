module.exports = function(sequelize, DataTypes){
  var Engineering = sequelize.define("engineering", {
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
        Engineering.belongsTo(models.tutors, {
          foreignKey: 'user_id'
        });
      }
    }
  });

  return Engineering;
};