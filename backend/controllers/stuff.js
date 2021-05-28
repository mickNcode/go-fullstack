const Thing = require('../models/Things'); //=> Importe le modèle 'Thing.js'


exports.createThing = (req, res, next) => {
    delete req.body._id; //=> Supprime le faux _id envoyé par le frontend
    const thing = new Thing({ //=> Crée une instance du modele 'Thing' en lui passant les infos du corps de la requete 
      ...req.body //=> '...' utilisé pour faire une copie de tous les éléments de req.body
    });
    thing.save() //=> Enregistre le 'Thing' dans la base de données
      .then(() => res.status(201).json({ message : 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error}))
};


exports.modifyThing = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) //=> Met à jour le 'Thing' qui correspond à l'objet passer en premier argument
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
}


exports.deleteThing =  (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id }) //=> On lui passe l'objet à supprimer
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
};


exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id }) //=> Permet de trouver le 'Thing' unique ayant le meme '_id' que dans la requete
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
};


exports.getAllThings = (req, res, next) => {
    Thing.find() //=> Renvoie un tableau contenant tous les 'Things' dansd la base de donnée
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
};