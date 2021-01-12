//USER.JS - CONTROLLERS 
//On retrouve ici toute la logique métier en lien avec nos utilisateurs, appliqué aux routes POST pour les opérations d'inscription et de connexion

//Importation de la dépendance Bcrypt pour chiffrer les mots de passe utilisateur
const bcrypt = require('bcrypt')
//Importation de la dépendance Jsonwebtoken qui va renvoyer un token unique pour un utilisateur à chaque requête
const jwt = require('jsonwebtoken');

//Importation des modèles
//On récupère notre model User ,créer avec le schéma mongoose
const User = require('../models/Users');

//Middleware pour la création d'un utilisateur
exports.signup = (req, res, next) => {
    //On appelle la méthode hash de bcrypt et on lui passe le mdp de l'utilisateur. On fait faire 10 tour à l'algorithme pour sécuriser le mdp
    bcrypt.hash(req.body.password, 10)
    //On récupère le hash afin d'enregistrer l'utilisateur dans la base de données
    .then(hash => {
        //Création d'un utilisateur selon le modèle User
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => {
            res.status(201).json({
                message: 'Utilisateur créé !'
            });
        })
        .catch(() => {
            res.writeHead(400, '{"message":"Mauvais format d\'email !"}', {
                'content-type': 'application/json'
            });
            res.end('Format d\'email incorrect');
        });
    })
    .catch(error => {
        res.status(500).json({
            error
        });
    });
};

//Middleware pour la connexion d'un utilisateur
exports.login = (req, res, next) => {
    //On recherche l'utilisateur dans la base de données
    User.findOne({
        email: req.body.email
    })
    .then(user => {
        //Si l'utilisateur n'existe pas
        if(!user) {
            return res.status(401).json({
                error: 'Utilisateur non trouvé !'
            });
        }
        //Si l'utilisateur existe, on vérifie le mdp
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            //Si le mot de passe ne correspond pas
            if(!valid){
                return res.status(401).json({
                    error: 'Mot de passe non trouvé !'
                });
            }
            //Si le mot de passe correspond, on attribut un token de connexion unique à l'utilisateur
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => {
            res.status(500).json({
                error
            });
        });
    })
    .catch(error => {
        res.status(500).json({
            error
        });
    });
};