//SERVER.JS - SERVER NODE

//Importation du package HTTP natif de Node
const http = require('http');
//Importation du module normalize-port pour vérifier la nature du port d'écoute du serveur
const normalizePort = require('normalize-port');
//Importation du fichier app.js pour utiliser l'application express dans le projet
const app = require('./app');

//Constante qui stoke le port d'écoute du serveur en vérifiant la nature du port avec normalize-port
const port = normalizePort(process.env.PORT || 3000);

//Implémentation du port d'écoute pour l'application app.js
app.set("port", port);

//Création du serveur
const server = http.createServer(app);

//Configuration du serveur pour qu'il rest à l'écoute d'un port
server.listen(port, () => {
    console.log(`Listening on ${port}`);
});
