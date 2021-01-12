//APP.JS - APPLICATION EXPRESS

//Importation d'express pour le fonctionnement de l'application
const express = require('express');

//Création de l'application express
const app = express();

//Réponse du serveur
app.use((req, res) => {
    res.json({
        message: "La requête a bien été reçue !"
    });
});

//Exportation de l'application pour le reste du projet
module.exports = app;