const {Model, DataTypes} = require('sequelize');
const sequelize = require('../connection');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        unique: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
    }
}, {
    sequelize,
    modelName: 'User'
});

module.exports = User;