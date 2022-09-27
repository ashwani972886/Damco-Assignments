const {Model, DataTypes} = require('sequelize');
const sequelize = require('../connection');

class User extends Model {}

User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    role: DataTypes.STRING
}, {
    sequelize,
    modelName: 'users'
});

module.exports = User;