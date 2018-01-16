const Sequelize = require('sequelize');
const sequelize = new Sequelize('clothstore', 'root', 'root', {
	dialect: 'mysql',
	host: 'localhost',
	
})

module.exports = sequelize;