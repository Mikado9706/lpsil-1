var sequelize = require('../bd.js');
const Sequelize = require('sequelize');

const User = sequelize.define('utilisateurs', {
	username: Sequelize.STRING,
	mdp: Sequelize.STRING,
	admin: Sequelize.INTEGER
}
, 
{
  tableName : 'utilisateurs',
  createdAt : 'sys_created',
  updatedAt : 'sys_modified',
  deletedAt : false,
  freezeTableName: true
});

User.sync();

module.exports = User;
