//USER.JS - ROUTES 
//Listes des fonctions pour les différentes routes concernant les utilisateurs

//Importation de la dépendance express pour la création de router pour l'authentification des utilisateurs
const express = require('express');
//Importation du controller user pour la création des routes d'authentification utilisateur
const userCtrl = require('../controllers/user');

//Création du routeur
const router = express.Router();

//Création des routes pour la création utilisateur et la connexion utilisateur
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

//Exportation des routes pour le reste du projet
module.exports = router;