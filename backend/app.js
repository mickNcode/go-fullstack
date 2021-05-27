const express = require('express'); //=> Importe 'express'
const bodyParser = require('body-parser'); //=> Importe 'body-parser'
const mongoose = require('mongoose'); //=> importe 'mongoose'
const app = express();
const Thing = require('./models/things'); //=> Importe le modèle 'Thing.js'

mongoose.connect('mongodb+srv://micka:190886@cluster0.wmgxu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', //=> Connection entre notre API et mongoose
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //=> Accède à l'API depuis n'importe quelle origine (*)
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //=> Ajoute les headers mentionnés aux requete envoyés
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //=> Envoie des requetes avec les méthodes mentionnées
  next();
});


app.use(bodyParser.json());


app.post('/api/stuff', (req, res, next) => {
  delete req.body._id; //=> Supprime le faux _id envoyé par le frontend
  const thing = new Thing({ //=> Crée une instance du modele 'Thing' en lui passant les infos du corps de la requete 
    ...req.body //=> '...' utilisé pour faire une copie de tous les éléments de req.body
  });
  thing.save() //=> Enregistre le 'Thing' dans la base de données
    .then(() => res.status(201).json({ message : 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error}))
});


app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) //=> Met à jour le 'Thing' qui correspond à l'objet passer en premier argument
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});

app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id }) //=> Permet de trouver le 'Thing' unique ayant le meme '_id' que dans la requete
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});


app.use('/api/stuff', (req, res, next) => {
    Thing.find() //=> Renvoie un tableau contenant tous les 'Things' dansd la base de donnée
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
  });


  


module.exports = app;