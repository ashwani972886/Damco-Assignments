const {Model, DataTypes} = require('sequelize');
const sequelize = require('../connection');

const Company = require('./companies');
class Employee extends Model{}

Employee.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    company: {
        type: DataTypes.INTEGER,
        required: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        unique: true
    }
},{
    sequelize,
    modelName: 'employee'
});

Company.hasMany(Employee, {foreignKey: 'company', as: 'employeeDetails'});
Employee.belongsTo(Company, {foreignKey: 'company', as: 'companyDetails'});

module.exports = Employee;