module.exports = function(sequelize, DataTypes){
  var Mathematics = sequelize.define("mathematics", {
    tutor_id: {
      type: DataTypes.INTEGER,
			allowNull: false,
      primaryKey: true
    },
    classes: {
      type: DataTypes.TEXT,
			allowNull: false
    }
  }, {
    timestamps: false
  }, {
    classMethods: {
      associate: function(models) {
        Mathematics.belongsTo(models.tutors, {
          foreignKey: 'user_id'
        });
      }
    }
  });

  return Mathematics;
};