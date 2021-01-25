//USERS.JS - MODELS 
//Modèle Mongoose pour la création d'utilisateur

//Importation du package mongoose pour communiquer avec la base de données
const mongoose = require('mongoose');

//Importation du module mongoose-unique-validator pour vérifier l'utilisation d'une adresse email unique
const uniqueValidator = require('mongoose-unique-validator');

//Schéma d'un utilisateur
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Veuillez préciser votre adresse email"],
        unique: true,
        match: [ 	
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Veuillez entrer une adresse email correcte"]
    },
    password: {
        type: String,
        required: [true, "Veuillez choisir un mot de passe"]
    }
});

//Vérification que l'adresse email est unique
userSchema.plugin(uniqueValidator);

//Exportation du modèle User dans le reste du projet
module.exports = mongoose.model('User', userSchema);