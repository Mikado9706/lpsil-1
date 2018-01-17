var express = require('express');
//var morgan = require('morgan'); // Charge le middleware de logging
//var logger = require('log4js').getLogger('Server');
var bodyParser = require('body-parser');
require('./bd.js');
var app = express();
var user = require('./modele/utilisateurs.js');
var userController = require('./controller/utilisateurs.js');
var article = require('./modele/articles.js');
var articleController = require('./controller/articles.js');
var catController = require('./controller/categories.js');
var cat = require('./modele/categories.js');
var session = require('express-session');

// config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false}));
//app.use(morgan('combined')); // Active le middleware de logging

app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

//logger.info('server start');

app.get('/', function(req, res){
    res.render('login', {req: req, result : ""});
});

app.get('/login', function(req,res){
	res.render('login', {req: req, result : ""});
});

app.get('/logout', function(req,res){
	res.render('index', {req: req});
});

app.get('/register', function(req,res){
	res.render('register', {req: req,  result : ""});
});

app.get('/index', articleController.getArticles);

/*app.get('/profil', function(req, res){
    var id = req.query.id;
    var username = req.query.username;
    var mdp = req.query.mdp;
    res.render('profil', {req: req, id: id, username: username, mdp: mdp});
});*/

app.get('/profil', userController.getProfil);

/*app.get('/modifierProfil', function(req, res){
    var id = req.query.id;
    var username = req.query.username;
    var mdp = req.query.mdp;
    res.render('modifierProfil', {req: req, id: id, username: username, mdp: mdp});
});*/

/*app.get('/modifierMdp', function(req, res){
    var id = req.query.id;
    var mdp = req.query.mdp;
    res.render('modifierMdp', {req: req, id: id, mdp: mdp});
});*/

app.get('/loginAdmin', function(req, res){
    res.render('loginAdmin', {req: req, result :""});
});

app.get('/ajoutArticles', function(req, res){
    res.render('ajoutArticles',{req: req, result : ""});
});

app.get('/ajoutCategories', function(req, res){
    res.render('ajoutCategories',{req: req, result : ""});
});
/*
app.get('/supprimerArticles', function(req, res){
    res.render('supprimerArticles',{result : ""});
});*/

app.get('/supprimerArticles', articleController.getArticleForDelete);

app.get('/supprimerUtilisateurs', userController.getAllUsers);

app.get('/supprimerCategories', catController.getCategorieForDelete);

app.get('/products', function(req, res){
    res.render('products', {req: req});
});

app.get('/product_detail', function(req, res){
    res.render('product_detail', {req: req});
});

app.post('/login', userController.connect)

app.post('/loginAdmin', userController.loginAdmin)

app.post('/register', userController.register)

app.post('/profil', userController.modifierProfil)

//app.post('/modifierProfil',userController.modifierProfil)

//app.post('/modifierMdp',userController.modifierMdp)

app.post('/ajoutArticles', articleController.ajoutArticles)

app.post('/ajoutCategories', catController.ajoutCategories)

app.post('/supprimerArticles', articleController.supprimerArticles)

app.post('/supprimerUtilisateurs', userController.supprimerUtilisateurs)

app.post('/supprimerCategories', catController.supprimerCategories)

app.post('/logout', (req, res) => {
    req.session.user = undefined;
    res.status(200).send();
});

app.listen(process.env.PORT || 1313);

// app.delete('', userController.suprr)
