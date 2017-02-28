//creating a virtue table so sequelize can run properly
module.exports = function(sequelize, DataTypes){
  var Users = sequelize.define("users", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
    userName: {
      type: DataTypes.STRING
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    pass: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  });

  return Users;
};
