//VERIFYPASSWORD.JS - MIDDLEWARE
//Middleware qui va vérifier si le mot de passe saisie correspond aux règles établies par le password-validator avant d'être crypté

//Importation du modèle pour la vérification du mot de passe
const passwordSchema = require('../models/password');

//Logique métier qui vérifie si le mot de passe saisie est correctement construit selon les attentes du passeword-validator. 
//Si non, une erreur est affichée
//Si oui, on passe au middleware suivant
module.exports = (req, res, next) => {
    if(!passwordSchema.validate(req.body.password)) {
        res.writeHead(400, '{ "message" : "Le mot de passe doit être composé de 8 caractères minimum (dont 1 majuscule, 1 minuscule, 2 chiffre et 1 symbole). Les espaces ne sont pas autorisés !" }');
        res.end("Le format du mot de passe n'est pas correct !");
    } else {
        next();
    }
};