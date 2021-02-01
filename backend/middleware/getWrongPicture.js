//GETWRONGPICTURE.JS - MIDDLEWARE
//Middleware récupérer l'image de la requête afin de la modifier (PUT) ou la supprimer si erreur dans la validation d'input

//Importation du modèle des sauces
const Sauce = require('../models/Sauces');

//Logique métier pour récupérer l'image d'une requête
module.exports = (req,res,next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        req.body.oldPictureName = sauce.imageUrl.split("/images/")[1];
        next();
    })
    .catch(error => res.status(500).json({message: error}));
} 
        
