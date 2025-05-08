const {DataTypes} = require('sequelize');
const sequelize = require('../db.js');

const Project = sequelize.define('Projects', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: {type: DataTypes.STRING, unique: true},
        text: {type: DataTypes.STRING},
        link: {type: DataTypes.STRING},
        image: {type: DataTypes.ARRAY(DataTypes.STRING), unique: true},
});

const User = sequelize.define('Users', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, allowNull: false, unique: true},
        password: {type: DataTypes.STRING, allowNull: false}
})

module.exports = { Project, User }
