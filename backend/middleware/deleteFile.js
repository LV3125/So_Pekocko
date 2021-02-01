//DELETEFILE.JS - MIDDLEWARE
//Middleware pour supprimer un fichier dans le dossier images

//Importation du module fs (File System) pour gérer les fichiers
const fs = require('fs');

//Logique métier pour la suppression d'une image dans le dossier images lors de la modification d'une sauce
module.exports = (req,res,next) => {
    if(!req.body.errorMessage) {
        if(req.body.oldPictureName) {
            deleteFile(req.body.oldPictureName,res);
        }
        res.status(200).json({message: "La sauce a bien été modifiée!"});
    } else {
        deleteFile(req.body.finalFileName,res);
        res.status(400).json({message: req.body.errorMessage});
    }
}

const deleteFile = (file,res) => {
    if(file) {
        fs.unlink('images/'+file, function(err) {
            if (err) { 
                console.log(file);
                res.status(500).json({message: err});
            };
        });
    }
}