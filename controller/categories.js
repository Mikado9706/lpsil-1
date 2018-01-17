var Categories = require('../modele/categories.js');
var sequelize = require('../bd.js');

module.exports.ajoutCategories = function(req,res){
  Categories.create({
  	nom_categorie: req.body.nom_categorie,

  }).then(Categories => {
    res.render("ajoutCategories", {result: "Catégorie ajouté avec succès"});
  }).catch(function(err){
    res.render("ajoutCategories", {result: "Erreur: ajout de la catégorie non effectuée"});
  });
}

module.exports.supprimerCategories = function(req,res){

  Categories.destroy({
    where: { 
        id: req.body.idCategorie
    }
  }).then(Categories => {
    sequelize.query("SELECT * FROM categories", { type: sequelize.QueryTypes.SELECT})
	.then(listeCategorieForDelete=> {
		res.render("supprimerCategories", {listeCategorieForDelete: listeCategorieForDelete});
	})
  }).catch(function(err){
    res.render("supprimerCategories", {result: "Erreur: suppression de la catégorie non effectuée"});
  });
}

module.exports.getCategorieForDelete = function(req,res){

	sequelize.query("SELECT * FROM categories", { type: sequelize.QueryTypes.SELECT})
	.then(listeCategorieForDelete=> {
		res.render("supprimerCategories", {listeCategorieForDelete: listeCategorieForDelete});
	})
}

module.exports.getCategories = function(req,res){

	sequelize.query("SELECT * FROM categories ", { type: sequelize.QueryTypes.SELECT})
	.then(listeCategories=> {
		res.render("index", {listeCategories: listeCategories});
	})
}