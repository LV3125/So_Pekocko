//VERIFYSAUCE.JS - MIDDLEWARE
//Middleware qui permet de vérifier les informations entrées par l'utilisateur lors de la création d'une sauce

const validate = require('mongoose-validator');

//Logique métier pour vérifier le format du nom de la sauce
exports.nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 60],
        message: "Le nom de votre sauce doit contenir entre 3 et 60 caractères",
    }),
    validate({
        validator: "matches",
        arguments: /^[a-z\d\-_\s]+$/i,
        message: "Vous ne pouvez utiliser que des chiffres et des lettres pour nommer notre sauce",
    })
];

exports.manufacturerValidator = [
    validate({
        validator: 'isLength',
        arguments: [3,40],
        message: "Le nom du fabricant doit contenir entre 3 et 40 caractères"
    }),
    validate({
        validator: 'matches',
        arguments: /^[a-z\d\-_\s]+$/i,
        message: "Vous ne pouvez utiliser que des chiffres et des lettres pour nommer le fabricant"
    })
];

exports.descriptionValidator = [
    validate({
        validator: 'isLengh',
        arguments: [10, 150],
        message: 'La description de la sauce doit contenir entre 10 et 150 caractères'
    }),
    validate({
        validator: 'matches',
        arguments: /^[a-z\d\-_\s]+$/i,
        message: 'Vous ne pouvez utiliser que des chiffres et des lettres pour la description de la sauce'
    })
];

exports.pepperValidator = [
    validate({
        validator: 'isLengh',
        arguments: [3, 20],
        message: "Le principal ingrédient doit contenir entre 3 et 20 caractères"
    }),
    validate({
        validator: "isAlphanumeric",
        message: "Ne peut contenir que des caractères alphanumérique entre 3 et 20 caractères"
    })
];