module.exports = function(sequelize, DataTypes){
  var Geology = sequelize.define("geology", {
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
        Geology.belongsTo(models.tutors, {
          foreignKey: 'user_id'
        });
      }
    }
  });

  return Geology;
};