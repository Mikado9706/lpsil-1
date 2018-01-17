var User = require('../modele/utilisateurs.js');
var sequelize = require('../bd.js');

module.exports.connect = function(req,res){

	User.findAll({
		where: {
			username: req.body.username,
			mdp: req.body.mdp,
            admin: 0
		}
	}).then(function(user){
		req.session.user=user[0].dataValues;
		res.render("profil", {req: req});
	}).catch(function(err){
		console.log(err)
		res.render("login", {req: req, result : "Le username ou le mot de passe est incorrect"});
	});
}

module.exports.register = function(req,res){

	User.create({ username: req.body.username, mdp: req.body.mdp, admin:0 })
	.then(user => {
		return res.render("register", {req: req});
	})
}

module.exports.getProfil = function(req,res){
	User.findById(req.body.voirProfil).then(function(userProfil){
		var id = userProfil.id;
		var username = userProfil.username;
		var mdp = userProfil.mdp;
}).catch(function(err){
	res.render("profil",{req: req, result : "KO"});
});
}

module.exports.modifierProfil = function(req,res){
        User.update({
        username: req.body.nouveauUsername,
        mdp: req.body.nouveauMdp
    },
    { where: {id: req.body.idUser}} )
    .then(function(user){
        res.render('profil',{req: req, result: ""});
    }).catch(function(err){
        res.render("error",{req: req, result: "KO"});
    });
}

/*module.exports.modifierMdp = function(req,res){

		User.update({
			mdp: req.body.nouveauMdp
		},
		{ where: {mdp: req.body.ancienMdp}} )
		.then(function(user){
		res.redirect('/index');
	}).catch(function(err){
		res.render("error",{req: req, result: "KO"});
	});
}*/

module.exports.loginAdmin = function(req,res){

	User.findAll({
		where: {
			username: req.body.usernameAdmin,
			mdp: req.body.mdpAdmin,
			admin: 1
		}
	}).then(function(user){
		req.session.user=user[0].dataValues;
		res.render("profil", {req: req});
	}).catch(function(err){
		console.log(err)
		res.render("loginAdmin", {req: req, result : "Le username ou le mot de passe ne correspond pas à ceux de l'admin."});
	});
}


module.exports.getAllUsers = function(req,res){

	sequelize.query("SELECT * FROM utilisateurs WHERE admin = 0", { type: sequelize.QueryTypes.SELECT})
	.then(listeUsers=>{
		res.render("supprimerUtilisateurs", {req: req, listeUsers: listeUsers});
	})
}

module.exports.supprimerUtilisateurs = function(req,res){

  User.destroy({
    where: { id: req.body.idUsers }
  }).then(user=> {
    sequelize.query("SELECT * FROM utilisateurs WHERE admin = 0", { type: sequelize.QueryTypes.SELECT})
	.then(listeUsers=>{
		res.render("supprimerUtilisateurs", {req: req, listeUsers: listeUsers});
	});
  }).catch(function(err){
    res.render("error",{req: req, result: "Erreur: suppression de l'utilisateur non effectué"});
  });
}
