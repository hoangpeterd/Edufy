//Why query twice what you can query once. Give me all the tutors who have Science (AKA query for if not null)
module.exports = function(sequelize, DataTypes){
	
	function isClassStyle(classList) {
				
		arr = classList.trim().replace(/\s+/g,'').toUpperCase().split(',')
		for (let i = 0; i < arr.length; i++) {
			if (!(/^[A-Z]{3,5}\d+$/.test(arr[i]))) {
				throw new Error ('Incorrect Syntax. If not provided, follow this example: MATH2001, ...etc')
			}
		}
	}
	
  var Classes = sequelize.define("classes", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
			isClassStyle: isClassStyle
    },
		liberalArts: {
      type: DataTypes.STRING,
			defaultValue: null,
			isClassStyle: isClassStyle
    },
    business: {
      type: DataTypes.STRING,
			defaultValue: null,
			isClassStyle: isClassStyle
    },
    engineering: {
      type: DataTypes.STRING,
			defaultValue: null,
			isClassStyle: isClassStyle
    },
    mathematics: {
      type: DataTypes.STRING,
			defaultValue: null,
			isClassStyle: isClassStyle
    },
    biology: {
      type: DataTypes.STRING,
			defaultValue: null,
			isClassStyle: isClassStyle
    },
    chemistry: {
      type: DataTypes.STRING,
			defaultValue: null,
			isClassStyle: isClassStyle
    },
    compSci: {
      type: DataTypes.STRING,
			defaultValue: null,
			isClassStyle: isClassStyle
    },
    geology: {
      type: DataTypes.STRING,
			defaultValue: null,
			isClassStyle: isClassStyle
    },
    physics: {
      type: DataTypes.STRING,
			defaultValue: null,
			isClassStyle: isClassStyle
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
