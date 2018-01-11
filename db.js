// connexion à la BDD via Sequelize
/*
const Sequelize = require('sequelize');
const sequelize = new Sequelize('clothstore', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});

sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
    })
    .catch(err => {
    console.error('Unable to connect to the database:', err);
    });

const User = sequelize.define('utilisateurs', {
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  }
});*/

var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'clothstore'
})

module.exports = {
    insertUser: (user, pwd) => {
        var sql = "INSERT INTO utilisateurs (username, password) VALUES ('" + user + "', '" + pwd + "')";
        con.query(sql, function (err, result) {
            if (err) throw new Error("Ca ne fonctionne pas");
            console.log("Enregistrement inséré. Nom: " + user + ""); 
        });
    },

    findUser: (user, pwd) => {
        var sql = "SELECT username FROM utilisateurs WHERE username='" + user + "' and password='" + pwd + "'";
        con.query(sql, function (err, result) {
            if (err) throw new Error("Ca ne fonctionne pas");
            console.log("L'utilisateur " + user + " à été trouvé");
        });
    },

    updateUser: (user, pwd, email) => {
        var sql = "UPDATE utilisateurs SET username='" + user + "', password ='" + pwd + "' where username='" + user + "'";
        con.query(sql, function (err, result) {
            if (err) throw new Error("Ca ne fonctionne pas");
            console.log("Les données de l'utilisateur " + user + " ont bien étés modifiées.");
        });
    },

    delUser: (user) => {
        var sql = "DELETE * FROM utilisateurs WHERE username='" + user + "'";
        con.query(sql, function (err, result) {
            if (err) throw new Error("Ca ne fonctionne pas");
            console.log("L'utilisateur " + user + " à bien été supprimé.");
        });
    }  
}
