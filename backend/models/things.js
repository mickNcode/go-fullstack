const mongoose = require('mongoose'); //=> Importe 'mongoose'

const thingSchema = mongoose.Schema({ //=> Crée un shéma de donnée pour l'objet
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Thing', thingSchema); //=> Exporte ce schéma  en tant que modele mongoose  appellé 'Thing' 