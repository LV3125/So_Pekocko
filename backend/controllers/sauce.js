//SAUCE.JS - CONTROLLERS
//Liste des logiques métiers pour les requêtes CRUD autour des sauces

//Importation du modèle mongoose des sauces
const Sauce = require('../models/Sauces');

//Logique métier pour créer une sauce (POST)
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
    .then(() => {
        res.status(201).json({
            message: "Sauce enregistrée !"
        })
    })
    .catch(error => {
        res.status(400).json({
            error
        })
    });
};

//Logique métier pour afficher toutes les sauces (GET)
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => {
        res.status(200).json(sauces)
    })
    .catch(error => {
        res.status(400).json({
            error
        })
    });
};