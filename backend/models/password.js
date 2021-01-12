//PASSWORD.JS - MODEL
//Modèle pour la validation des mots de passe lors de leur création pour renforcer leur sécurité

//Importation du module password-validator
const passwordValidator = require('password-validator');

//Création d'un schéma de validation de mot de passe
const passwordSchema = new passwordValidator();

//Edition des modalités du mot de passe attendu
passwordSchema
.is().min(8) //Minimum 8 caractères au mot de passe
.has().uppercase() //Minimum 1 majuscule
.has().lowercase() //Minimum 1 minuscule
.has().digits(2) //Minimum 2 chiffres
.has().symbols() //Minimum 1 symbole
.has().not().spaces(); //Pas d'espaces

//Exportation du modèle dans le reste du projet
module.exports = passwordSchema;