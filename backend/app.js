//APP.JS - APPLICATION EXPRESS

//Importation d'express pour le fonctionnement de l'application
const express = require('express');
//Importation du package mongoose pour communiquer avec la base de données
const mongoose = require('mongoose');
//Importation du module body-parser pour extraire l'objet JSON d'une demande du frontend
const bodyParser = require('body-parser');
//Importation du modul path pour gérer le chemin vers les fichiers stockés
const path = require('path');

//Importation et utilisation du module dotenv pour gérer la protection des informations de connexion à la base de donnée MongoDB
require('dotenv').config();

//Importation des routes pour la gestion des utilisateurs
const userRoutes = require('./routes/user');
//Importation des routes pour la gestion des sauces
const sauceRoutes = require('./routes/sauce');

//Connexion à la base de donnée MongoDB
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const ADDRESS = process.env.DB_ADDRESS;
mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@${ADDRESS}`, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true 
})
.then(() => {
    console.log('Connexion à MongoDB réussie !')
})
.catch(() => {
    console.log('Connexion à MongoDB échouée !')
});

//Création de l'application express
const app = express();

//Autorisation de communication entre des serveurs différents
app.use((req, res, next) => {
    // on indique que les ressources peuvent être partagées depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    // on indique les entêtes qui seront utilisées après la pré-vérification cross-origin afin de donner l'autorisation
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // on indique les méthodes autorisées pour les requêtes HTTP
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//Utilisation de body-parser par l'application
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

//Mise en place des routes pour la gestion des utilisateurs dans l'application
app.use('/api/auth', userRoutes);
//Mise en place des routes pour la gestion des sauces dans l'application 
app.use('/api/sauces', sauceRoutes);

//Exportation de l'application pour le reste du projet
module.exports = app;