module.exports = function(sequelize, DataTypes){
  var Biology = sequelize.define("biology", {
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
        Biology.belongsTo(models.tutors, {
          foreignKey: 'user_id'
        });
      }
    }
  });

  return Biology;
};