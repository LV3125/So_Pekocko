//SAUCE.JS - ROUTES
//Implémentation des routes pour les requêtes CRUD autour des sauces

//Importation d'express pour la création des routes
const express = require('express');
//Création d'une route express
const router = express.Router();
//Importation du middleware pour la gestion des images avec multer
const multer = require('../middleware/multer-config');

//Importation du controller pour implémenter les logiques métiers des routes
const sauceCtrl = require('../controllers/sauce');

//Création de la route POST pour la création d'une sauce
router.post('/', multer, sauceCtrl.createSauce);
//Création de la route GET pour afficher toutes les sauces
router.get('/', sauceCtrl.getAllSauces);
//Création de la route GET pour afficher une sauce en particulier
router.get('/:id', sauceCtrl.getOneSauce);

//Exportation des routes pour le reste du projet
module.exports = router;