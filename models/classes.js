//Why query twice what you can query once. Give me all the tutors who have Science (AKA query for if not null)
module.exports = function(sequelize, DataTypes){
  var Classes = sequelize.define("classes", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
		liberalArts: {
      type: DataTypes.STRING,
			defaultValue: null
    },
    business: {
      type: DataTypes.STRING,
			defaultValue: null
    },
    engineering: {
      type: DataTypes.STRING,
			defaultValue: null
    },
    mathematics: {
      type: DataTypes.STRING,
			defaultValue: null
    },
    biology: {
      type: DataTypes.STRING,
			defaultValue: null
    },
    chemistry: {
      type: DataTypes.STRING,
			defaultValue: null
    },
    compSci: {
      type: DataTypes.STRING,
			defaultValue: null
    },
    geology: {
      type: DataTypes.STRING,
			defaultValue: null
    },
    physics: {
      type: DataTypes.STRING,
			defaultValue: null
    }
  }, {
    timestamps: false
  }, {
    classMethod:{
      associate: function(models) {
        Classes.hasMany(model.availability, {
          onDelete: "cascade"
        });
      }
    }
  });

  return Classes;
};
