var Articles = require('../modele/articles.js');
var json_quantite=require("jsonq");

module.exports.ajoutArticles = function(req,res){
  Articles.create({
  	nom_article: req.body.nom_article,
    description_article: req.body.description_article,
    quantite_article: req.body.quantite_article,
  	prix_article: req.body.prix_article

  }).then(Articles => {
    res.render("ajoutArticles", {result: "Article ajouté avec succès"});
  }).catch(function(err){
    res.render("ajoutArticles", {result: "Erreur: ajout non effectué"});
  });
}

module.exports.supprimerArticles = function(req,res){

  Articles.destroy({
    where: { 
        nom_article: req.body.nom_article 
    }
  }).then(Articles => {
    res.render("supprimerArticles", {result: "Article supprimé avec succès"});
  }).catch(function(err){
    res.render("supprimerArticles", {result: "Erreur: suppression non effectuée"});
  });
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

  Articles.all().then(listeArticles=>{
    var lignes = JSON.stringify(listeArticles);
    var json_quantite_objets=json_quantite(lignes);
    var listeId = json_quantite_objets,
        id = listeId.find('id');
    var listeNom = json_quantite_objets,
        nom = listeNom.find('nom_article');
    var listePrix = json_quantite_objets,
        prix = listePrix.find('prix_article');
    var listeDescription = json_quantite_objets,
        description = listeDescription.find('description_article');
    var listeQuantite = json_quantite_objets,
        quantite = listeQuantite.find('quantite_article');
    res.render("index", {id: id.value(), nom: nom.value(), prix: prix.value(), description: description.value(), quantite: quantite.value() });
  })
}
