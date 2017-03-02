module.exports = function(sequelize, DataTypes){
  var CompSci = sequelize.define("compSci", {
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
        CompSci.belongsTo(models.tutors, {
          foreignKey: 'user_id'
        });
      }
    }
  });

  return CompSci;
};