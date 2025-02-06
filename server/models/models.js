const {DataTypes} = require('sequelize');
const sequelize = require('../db.js');

const Project = sequelize.define('Project', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: {type: DataTypes.STRING, unique: true},
	text: {type: DataTypes.STRING},
	link: {type: DataTypes.STRING},
	image: {type: DataTypes.STRING, unique: true},
});

module.exports = { Project }
