//creating a virtue table so sequelize can run properly
module.exports = function(sequelize, DataTypes){
  var Users = sequelize.define("users", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
		account_type: {
			type: DataTypes.STRING
		}
  }, {
    timestamps: false
  });

  return Users;
};
