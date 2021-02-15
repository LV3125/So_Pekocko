//SAUCE.JS - CONTROLLERS
//Liste des logiques métiers pour les requêtes CRUD autour des sauces

//Importation du modèle mongoose des sauces
const Sauce = require('../models/Sauces');
//Importation du module fs (File System) pour gérer les fichiers
const fs = require('fs');

//Logique métier pour créer une sauce (POST)
exports.createSauce = (req,res,next) => {
    const sauceObjet = JSON.parse(req.body.sauce);
    delete sauceObjet._id;
    const sauce = new Sauce({
        ...sauceObjet,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    if(!req.body.errorMessage) {
        sauce.save()
        .then(() => { 
            res.status(201).json({ 
                message: 'La sauce a été créée avec succès!' 
            }); 
        })
        .catch(error => { 
            res.status(400).json({
                error
            });
            next();
        })
    } else {
        next();
    }
};

//Logique métier pour afficher toutes les sauces (GET)
exports.getAllSauces = (req,res,next) => {
    Sauce.find()
    .then(sauces => {
        res.status(200).json(sauces);
    })
    .catch(error => {
        res.status(400).json({ 
            error 
        });
    });
};

//Logique métier pour afficher une sauce en particulier (GET)
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => {
        res.status(200).json(sauce);
    })
    .catch( error => {
        res.status(404).json({ 
            error 
        });
    });
};

//Logique métier pour modifier une sauce en particulier (PUT)
exports.modifyOneSauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    if(!req.body.errorMessage) {
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => {
            if(!req.file) {
                res.status(200).json({ message: "La sauce a bien été modifiée!"})
            } else {
                next();
            }
        })
        .catch(error => { 
            res.status(400).json({
                error
            });
        })
    } else {
        next();
    }
};

//Logique métier pour supprimer une sauce en particulier (DELETE)
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
                res.status(200).json({ 
                    message: 'La sauce a bien été supprimée !'
                });
            })
            .catch(error => {
                res.status(400).json({ 
                    error 
                });
            });
        });
    })
    .catch(error => res.status(500).json({ 
        error 
    }));
};

//Logique métier pour l'évaluation d'une sauce en particulier (POST)
exports.assessSauce = (req, res, next) => {
    switch (req.body.like) {
        case 0:
            Sauce.findOne(
                {
                    _id: req.params.id
                }
            )
            .then((sauce) => {
                if(sauce.usersLiked.find(user => user === req.body.userId)) {
                    Sauce.updateOne(
                        {
                            _id: req.params.id
                        }, {
                            $inc: { likes: -1},
                            $pull: { usersLiked: req.body.userId}
                        }
                    )
                    .then(() => {
                        res.status(201).json({
                            message: "Vote enregistré !"
                        })
                    })
                    .catch(error => {
                        res.status(400).json({
                            error
                        })
                    });
                }
                if(sauce.usersDisliked.find(user => user === req.body.userId)) {
                    Sauce.updateOne(
                        {
                            _id: req.params.id
                        }, {
                            $inc: { dislikes: -1},
                            $pull: { usersDisliked: req.body.userId}
                        }
                    )
                    .then(() => {
                        res.status(201).json({
                            message: "Vote enregistré !"
                        })
                    })
                    .catch(error => {
                        res.status(400).json({
                            error
                        })
                    });
                }
            })
            .catch(error => {
                res.status(404).json({
                    error
                })
            });
            break;

            case 1:                                                 
            Sauce.updateOne(
                { 
                    _id: req.params.id 
                }, {            
                    $inc: { likes: 1 },                                
                    $push: { usersLiked: req.body.userId }             
                })
            .then(() => { 
                res.status(201).json({ 
                    message: "Vote enregistré !" 
                }); 
            }) 
            .catch((error) => { 
                res.status(400).json({ 
                    error 
                }); 
            });
            break;
          

        case -1:
            Sauce.updateOne(
                {
                    _id: req.params.id
                }, {
                    $inc: { dislikes: 1},
                    $push: { usersDisliked: req.body.userId}
                }
            )
            .then(() => {
                res.status(201).json({
                    message: "Vote entegistré !"
                })
            })
            .catch(error => {
                res.status(400).json({
                    error
                })
            });
            break;

        default:
            console.log('Requête non correcte');
    }
};