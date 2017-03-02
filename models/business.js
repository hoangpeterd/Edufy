module.exports = function(sequelize, DataTypes){
  var Business = sequelize.define("business", {
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
        Business.belongsTo(models.tutors, {
          foreignKey: 'user_id'
        });
      }
    }
  });

  return Business;
};