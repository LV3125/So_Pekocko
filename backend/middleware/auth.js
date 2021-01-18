//AUTH.JS - MIDDLEWARE
//Middleware qui protège les routes (requêtes) en vérifiant si l'utilisateur est bien authentifié

//Importation du module JsonWebToken qui va attribuer un token d'authentification à l'utilisateur lors de sa connexion
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId){
            throw 'UserId non valide';
        }else{
            next();
        }
    }
    catch (error) {
        res.status(401).json({
            error: error | "Requête non authentifiée"
        })
    }
}