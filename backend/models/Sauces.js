//SAUCES.JS - MODEL
//Modèle mongoose pour la création d'une sauce

//Importation du package mongoose pour communiquer avec la base de données
const mongoose = require('mongoose');
const validateSauce = require('../middleware/verifySauce');

//Création du schéma pour une sauce
const sauceSchema = mongoose.Schema({
    userId: {
        type: String, 
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    mainPepper: {
        type: String, 
        required: true
    },
    imageUrl: {
        type: String, 
        required: true
    },
    heat: {
        type: Number, 
        required: true
    },
    likes: {
        types: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    usersLiked: {
        type: [String]
    },
    usersDisliked: {
        type: [String]
    }
});

//Exportation du modèle pour le reste du projet
module.exports = mongoose.model('Sauce', sauceSchema);