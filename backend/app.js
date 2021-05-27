const express = require('express'); //=> Importe 'express'
const bodyParser = require('body-parser'); //=> Importe 'body-parser'
const mongoose = require('mongoose'); //=> importe 'mongoose'

const stuffRoutes = require('./routes/stuff'); //=> Importe le fichier 'stuff.js'



mongoose.connect('mongodb+srv://micka:190886@cluster0.wmgxu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', //=> Connection entre notre API et mongoose
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //=> Accède à l'API depuis n'importe quelle origine (*)
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //=> Ajoute les headers mentionnés aux requete envoyés
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //=> Envoie des requetes avec les méthodes mentionnées
  next();
});


app.use(bodyParser.json());

app.use('/api/stuff', stuffRoutes);

module.exports = app;