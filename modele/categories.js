var sequelize = require('../bd.js');
const Sequelize = require('sequelize');

const Cat = sequelize.define('categories', {
	nom_categorie: Sequelize.STRING,
}
, 
{
  tableName : 'categories',
  createdAt : 'sys_created',
  updatedAt : 'sys_modified',
  deletedAt : false,
  freezeTableName: true
});

Cat.sync();

module.exports = Cat;
