var Articles = require('../modele/articles.js');
var sequelize = require('../bd.js');

module.exports.ajoutArticles = function(req,res){
  Articles.create({
  	nom_article: req.body.nom_article,
    description_article: req.body.description_article,
    quantite_article: req.body.quantite_article,
  	prix_article: req.body.prix_article

  }).then(Articles => {
    res.render("ajoutArticles", {req: req, result: "Article ajouté avec succès"});
  }).catch(function(err){
    res.render("ajoutArticles", {req: req, result: "Erreur: ajout non effectué"});
  });
}

module.exports.supprimerArticles = function(req,res){

  Articles.destroy({
    where: { 
        id: req.body.idArticle
    }
  }).then(articles => {
    sequelize.query("SELECT * FROM articles", { type: sequelize.QueryTypes.SELECT})
	.then(listeArticleForDelete=> {
		res.render("supprimerArticles", {req: req, listeArticleForDelete: listeArticleForDelete});
	})
  }).catch(function(err){
    res.render("supprimerArticles", {req: req, result: "Erreur: suppression non effectuée"});
  });
}

module.exports.getArticleForDelete = function(req,res){

	sequelize.query("SELECT * FROM articles", { type: sequelize.QueryTypes.SELECT})
	.then(listeArticleForDelete=> {
		res.render("supprimerArticles", {req: req, listeArticleForDelete: listeArticleForDelete});
	})
}

/*module.exports.modifierArticles = function(req,res){

  Articles.update({
    where: { 
        nom_article: req.body.nom_article,
        description_article: req.body.description_article,
        quantite_article: req.body.quantite_article,
        prix_article: req.body.prix_article
    }
  }).then(Articles=> {
    res.render("modifierArticles", {result: "Article modifié avec succès"});
  }).catch(function(err){
    res.render("modifierArticles", {result: "Erreur: modification non effectuée"});
  });
}*/


module.exports.getArticles = function(req,res){

	sequelize.query("SELECT * FROM articles ", { type: sequelize.QueryTypes.SELECT})
	.then(listeArticles=> {
		res.render("index", {req: req, listeArticles: listeArticles});
	})
}
