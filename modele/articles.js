var sequelize = require('../bd.js');
const Sequelize = require('sequelize');

const Articles = sequelize.define('articles', {
  nom_article: Sequelize.STRING,
  description_article: Sequelize.STRING,
  quantite_article: Sequelize.INTEGER,
  prix_article: Sequelize.INTEGER

}
, 
{
  tableName : 'articles',
  createdAt : 'sys_created',
  updatedAt : 'sys_modified',
  deletedAt : false,
  freezeTableName : true
});

Articles.sync();

module.exports = Articles;
