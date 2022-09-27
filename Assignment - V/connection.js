const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('users-db', '', '', {
    dialect: 'sqlite',
    host:'Assignment - V/CRUD.sqlite'
});

sequelize.sync().then(() => console.log('Successfully connected to sqlite database!')).catch(() => console.log('Unable to connect to sqlite!'));

module.exports = sequelize;