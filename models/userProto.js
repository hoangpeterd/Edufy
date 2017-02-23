module.exports = function(sequelize, dataTypes) {
  
  var userProto = sequelize.define('userproto', {
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fullname: {
      type: dataTypes.STRING,
      allowNull: false
    },
    school: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    gravatarEmail: {
      type: dataTypes.STRING,
      allowNull: false,
    }
  }, {
    timestamps: false,
  });
  return userProto
}
