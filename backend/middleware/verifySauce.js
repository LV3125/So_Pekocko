//VERIFYSAUCE.JS - MIDDLEWARE
//Middleware qui permet de vérifier les informations entrées par l'utilisateur lors de la création d'une sauce

//Règles REGEX dans un tableau pour chaque champs de création d'une sauce à vérifier
const controleRegex = [/^[a-zéèàêëîïûüôöç\d\-_\s]{2,40}$/i,
                    /^[a-zéèàêëîïûüôöç\d\-_\s]{2,40}$/i,
                    /^[a-zéèàêëîïûüôöç\d\-_\s]{5,150}$/i,
                    /^[a-zéèàêëîïûüôöç\d\-_\s]{2,40}$/i,
                    /^([1-9]|10)$/
                ];

//Logique métier pour la vérification des données utilisateur lors de la création ou modification d'une sauce / Sécurité
module.exports = (req,res,next) => {
    let compteur = 0;
    if(req.body.sauce) {
        sauceObjet = JSON.parse(req.body.sauce);
    } else {
        sauceObjet = { ...req.body };
    }
    for (const key in sauceObjet) {
        if (sauceObjet.hasOwnProperty(key)&&compteur<5) {
            if(!controleRegex[compteur].test(sauceObjet[key])) {
                if(key === "name"){
                    req.body.errorMessage = "Le champ "+key+ " ne semble pas valide ! le champ "+ key +" doit être compris entre 2 et 40 caractères";
                }
                else if(key === "manufacturer"){
                    req.body.errorMessage = "Le champ "+key+ " ne semble pas valide ! le champ "+ key +" doit être compris entre 2 et 40 caractères";
                }
                else if(key === "description"){
                    req.body.errorMessage = "Le champ "+key+ " ne semble pas valide ! le champ "+ key +" doit être compris entre 5 et 150 caractères";
                }
                else if(key === "mainPepper"){
                    req.body.errorMessage = "Le champ "+key+ " ne semble pas valide ! le champ "+ key +" doit être compris entre 2 et 40 caractères";
                }
                else if(key === "heat"){
                    req.body.errorMessage = "Le champ "+key+ " ne semble pas valide ! le champ "+ key +" doit être compris entre 1 et 10";
                }
                next();
            }  
        }
        compteur++;      
    }
    next();
}