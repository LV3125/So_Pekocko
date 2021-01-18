//SAUCE.JS - ROUTES
//Implémentation des routes pour les requêtes CRUD autour des sauces

//Importation d'express pour la création des routes
const express = require('express');
//Création d'une route express
const router = express.Router();
//Importation du middleware pour la vérificaiton de l'authentification de l'utilisateur
const auth = require('../middleware/auth');
//Importation du middleware pour la gestion des images avec multer
const multer = require('../middleware/multer-config');

//Importation du controller pour implémenter les logiques métiers des routes
const sauceCtrl = require('../controllers/sauce');

//Création de la route POST pour la création d'une sauce
router.post('/', auth, multer, sauceCtrl.createSauce);
//Création de la route GET pour afficher toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauces);
//Création de la route GET pour afficher une sauce en particulier
router.get('/:id',auth, sauceCtrl.getOneSauce);
//Création de la route PUT pour modifier une sauce en particulier
router.put('/:id',auth, multer, sauceCtrl.modifySauce);
//Création de la route DELETE pour supprimer une sauce en particulier
router.delete('/:id',auth, sauceCtrl.deleteSauce);
//Création de la route POST pour les likes et dislikes
router.post('/:id/like', auth, sauceCtrl.assessSauce);

//Exportation des routes pour le reste du projet
module.exports = router;