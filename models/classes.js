//Why query twice what you can query once. Give me all the tutors who have Science (AKA query for if not null)
module.exports = function (sequelize, DataTypes) {

	function isClassStyle(classList) {

		arr = classList.trim().replace(/\s+/g, '').toUpperCase().split(',');
		for (let i = 0; i < arr.length; i++) {
			if (!(/^[A-Z]{3,5}\d+$/.test(arr[i]))) {
				throw new Error('Incorrect Syntax. If not provided, follow this example: MATH2001, ...etc');
			}
		}
	}

	var Classes = sequelize.define("classes", {
		tutor_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		liberalArts: {
			type: DataTypes.STRING(130),
			defaultValue: null,
			validate: {
				isClassStyle: isClassStyle
			}
		},
		business: {
			type: DataTypes.STRING(130),
			defaultValue: null,
			validate: {
				isClassStyle: isClassStyle
			}
		},
		engineering: {
			type: DataTypes.STRING(130),
			defaultValue: null,
			validate: {
				isClassStyle: isClassStyle
			}
		},
		mathematics: {
			type: DataTypes.STRING(130),
			defaultValue: null,
			validate: {
				isClassStyle: isClassStyle
			}
		},
		biology: {
			type: DataTypes.STRING(130),
			defaultValue: null,
			validate: {
				isClassStyle: isClassStyle
			}
		},
		chemistry: {
			type: DataTypes.STRING(130),
			defaultValue: null,
			validate: {
				isClassStyle: isClassStyle
			}
		},
		compSci: {
			type: DataTypes.STRING(130),
			defaultValue: null,
			validate: {
				isClassStyle: isClassStyle
			}
		},
		geology: {
			type: DataTypes.STRING(130),
			defaultValue: null,
			validate: {
				isClassStyle: isClassStyle
			}
		},
		physics: {
			type: DataTypes.STRING(130),
			defaultValue: null,
			validate: {
				isClassStyle: isClassStyle
			}
		}
	}, {classMethods: {
				associate: function (models) {
					Classes.belongsTo(models.tutors, {
						foreignKey: {
							name: 'tutor_id',
						onDelete: "cascade"
					}
					});
				},
				timestamps: false
			}
		});
	return Classes;
};
