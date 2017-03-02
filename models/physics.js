module.exports = function(sequelize, DataTypes){
  var Physics = sequelize.define("physics", {
    tutor_id: {
      type: DataTypes.INTEGER,
			allowNull: false,
      primaryKey: true
    },
    classes: {
      type: DataTypes.TEXT,
			isAlphanumeric: true,
			allowNull: false,
			isClassStyle: function (classList) {
				
				arr = classList.trim().replace(/\s+/g,'').toUpperCase().split(',')
				for (let i = 0; i < arr.length; i++) {
					if (!(/^[A-Z]{3,5}\d+$/.test(arr[i]))) {
						throw new Error ('Incorrect Syntax. If not provided, follow this example: MATH2001, ...etc')
					}
				}
			}
    }
  }, {
    timestamps: false
  }, {
    classMethods: {
      associate: function(models) {
        Physics.belongsTo(models.tutors, {
          foreignKey: 'user_id'
        });
      }
    }
  });

  return Physics;
};