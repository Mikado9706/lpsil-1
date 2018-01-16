var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var logger = require('log4js').getLogger('Server');
var bodyParser = require('body-parser');
require('./bd.js');
var app = express();
var user = require('./modele/utilisateurs.js');
var userController = require('./controller/utilisateurs.js');
var produit = require('./modele/articles.js');
var produitController = require('./controller/articles.js');
var session = require('express-session');

// config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(morgan('combined')); // Active le middleware de logging

app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

logger.info('server start');

app.get('/', function(req, res){
    res.redirect('/login');
});

app.get('/login', function(req,res){
	res.render('login',{result : ""});
});

app.get('/register', function(req,res){
	res.render('register');
});

app.get('/index', produitController.getArticles);

app.get('/profil', function(req, res){
    var id = req.query.id;
    var username = req.query.username;
    res.render('profil', {id: id, username: username});
});

app.get('/modifierProfil', function(req, res){
    var id = req.query.id;
    var username = req.query.username;
    res.render('modifierProfil', {id: id, username: username});
});

app.get('/modifierMdp', function(req, res){
    var id = req.query.id;
    var mdp = req.query.mdp;
    res.render('modifierMdp', {id: id, mdp: mdp});
});

app.get('/loginAdmin', function(req, res){
    res.render('loginAdmin',{result : ""});
});

app.get('/profilAdmin', function(req, res){
    res.render('profilAdmin');
});

app.get('/ajoutArticles', function(req, res){
    res.render('ajoutArticles',{result : ""});
});

app.get('/supprimerArticles', function(req, res){
    res.render('supprimerArticles',{result : ""});
});

app.get('/products', function(req, res){
    res.render('products');
});

app.get('/product_detail', function(req, res){
    res.render('product_detail');
});


app.post('/login',userController.connect)

app.post('/register',userController.register)

app.post('/profil',userController.getProfil)

app.post('/modifierProfil',userController.modifierProfil)

app.post('/modifierMdp',userController.modifierMdp)

app.post('/loginAdmin', userController.loginAdmin)

app.post('/ajoutArticles', produitController.ajoutArticles)

app.post('/supprimerArticles', produitController.supprimerArticles)

app.listen(process.env.PORT || 1313);

// app.delete('', userController.suprr)
