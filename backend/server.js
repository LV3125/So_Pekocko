//SERVER.JS - SERVER NODE

//Importation du package HTTP natif de Node
const http = require('http');

//Constante qui stoke le port d'écoute du serveur
const port = process.env.PORT || 3000;

//Création du serveur
const server = http.createServer((req, res) => {
    res.end('Réponse du serveur');
});

//Configuration du serveur pour qu'il rest à l'écoute d'un port
server.listen(port);