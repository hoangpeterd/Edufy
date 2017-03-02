module.exports = function(sequelize, DataTypes){
  var Chemistry = sequelize.define("chemistry", {
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
        Chemistry.belongsTo(models.tutors, {
          foreignKey: 'user_id'
        });
      }
    }
  });

  return Chemistry;
};