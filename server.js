var express = require('express');
var db = require('./db');
var morgan = require('morgan'); // Charge le middleware de logging
var logger = require('log4js').getLogger('Server');
var bodyParser = require('body-parser');
var app = express();
var Uname = "";
var Upw = "";
var urlencodedparser = bodyParser.urlencoded({ extended: false });

// config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined')); // Active le middleware de logging

app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)

logger.info('server start');

// redirection des pages du site

app.get('/', function(req, res){
    res.redirect('/index');
});

app.get('/admin', function(req, res){
    res.render('admin');
});

app.post('/admin', urlencodedparser, function(req, res){
    Uname = req.body.username;
    Upw = req.body.password;
    db.findUser(Uname,Upw);
    res.end;
    res.redirect('/admin');
});

app.get('/cart', function(req, res){
    res.render('cart');
});

app.get('/checkout', function(req, res){
    res.render('checkout');
});

app.get('/contact', function(req, res){
    res.render('contact');
    
});

app.get('/foot', function(req, res){
    res.render('foot');
});

app.get('/head', function(req, res){
    res.render('head');
});

app.get('/index', function(req, res) {
    var tagline = "CHANGEMENT REUSSI";

    res.render('index', {
        tagline: tagline
    });
});

app.get('/product_detail', function(req, res){
    res.render('product_detail');
});

app.get('/products', function(req, res){
    res.render('products');
});

app.get('/login', function(req, res){
    res.render('login');
});

app.post('/login', urlencodedparser, function(req, res){
    Uname = req.body.username;
    Upw = req.body.password;
    db.findUser(Uname,Upw);
    res.end;
    res.redirect('/login');
});

app.get('/register', function(req, res){
    res.render('register');
});

app.post('/register', urlencodedparser, function(req, res){
    Uname = req.body.username;
    Upw = req.body.password;
    db.insertUser(Uname,Upw);
    res.end;
    res.redirect('/register');
    
});

app.listen(process.env.PORT||1313);

process.on('uncaughtException', function(e) {
    logger.error('FATAL : ', e);
    process.exit(99);
})

