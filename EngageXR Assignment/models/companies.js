const {Model, DataTypes} = require('sequelize');
const sequelize = require('../connection');

class Company extends Model{}

Company.init({
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        unique: true
    },
    website: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    sequelize,
    modelName: 'Company'
});

module.exports = Company;