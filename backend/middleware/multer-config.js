//MULTER-CONFIG.JS - MIDDLEWARE
//Middleware pour la gestion des images envoyées par un utilisateur avec le module multer

const multer = require('multer');

const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpg',
    'image/png' : 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    filename: (req, file, callback) => {
        let name = file.originalname.split(' ').join('_');
        let extension = MIME_TYPES[file.mimetype];
        name = name.replace('.' + extension, '_');

        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({
    storage: storage
}).single('image');