const {Sequelize} = require('sequelize');


const sequelize = new Sequelize('engagexr', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});


sequelize.sync().then(() => console.log('Successfully connected to MySQL database!')).catch((err) => console.log('Unable to connect to MySQL!' + err));

module.exports = sequelize;