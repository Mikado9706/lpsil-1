var User = require('../modele/utilisateurs.js');

module.exports.connect = function(req,res){

	User.findAll({
		where: {
			username: req.body.username,
			mdp: req.body.mdp
		}
	}).then(function(user){
		req.session.user=user[0].dataValues.id;
 		res.cookie( "id", req.session.user ,{ maxAge: 1000 * 60 * 10, httpOnly: false });

		res.redirect("/profil"/*,{result :req.session.user }*/);
	}).catch(function(err){
		console.log(err)
		res.render("login", {result : "Le username ou le mot de passe est incorrect"});
	});
}

module.exports.register = function(req,res){

	User.create({ username: req.body.username, mdp: req.body.mdp, admin:0 })
	.then(user => {
		return res.render("login");
	})
}

module.exports.getProfil = function(req,res){

	User.findById(req.body.voirProfil).then(function(userProfil){
		var id = userProfil.id;
		var username = userProfil.username;
		var mdp = userProfil.mdp;
		res.redirect('/profil?id='+id+'&username='+username);
}).catch(function(err){
	console.log(err)
	res.render("error",{result : "KO"});
});
}

module.exports.modifierProfil = function(req,res){
					User.update({
					username: req.body.username,
				},
				{ where: {id: req.body.idUser}} )
				.then(function(user){
					res.redirect('/index');
				}).catch(function(err){
					res.render("error",{result: "KO"});
				});
}

module.exports.modifierMdp = function(req,res){

		User.update({
			mdp: req.body.nouveauMdp
		},
		{ where: {mdp: req.body.ancienMdp}} )
		.then(function(user){
		res.redirect('/index');
	}).catch(function(err){
		res.render("error",{result: "KO"});
	});
}

module.exports.loginAdmin = function(req,res){

	User.findAll({
		where: {
			username: req.body.usernameAdmin,
			mdp: req.body.mdpAdmin,
			admin: 1
		}
	}).then(function(user){
		req.session.user=user[0].dataValues.id;
 		res.cookie( "id",req.session.user ,{ maxAge: 1000 * 60 * 10, httpOnly: false });

		res.redirect("/profilAdmin"/*,{result :req.session.user }*/);
	}).catch(function(err){
		console.log(err)
		res.render("loginAdmin",{result : "Le compte n'existe pas ou n'est pas un administrateur du site"});
	});
}
