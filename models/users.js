//creating a virtue table so sequelize can run properly
module.exports = function(sequelize, DataTypes){
  var Users = sequelize.define("users", {
		user_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
    username: {
      type: DataTypes.STRING(50),
			isEmail: true,
			allowNull: false
    },
    password: {
      type: DataTypes.STRING(65),
			allowNull: false
    },
		firstName: {
      type: DataTypes.STRING(15),
			isAlpha: true,
			allowNull: false
    },
		lastName: {
      type: DataTypes.STRING(15),
			isAlpha: true,
			allowNull: false
    },
		picUrl: {
      type: DataTypes.STRING(100)
    },
		accountType: {
			type: DataTypes.ENUM('student','tutor'),
			allowNull: false
		}
  }, {
    timestamps: false
  }, {
		instanceMethods: {
    	toJSON: function () {
				var values = Object.assign({}, this.get());

				delete values.password;
      	return values;
			}
  	}
	}
);

  return Users;
};
