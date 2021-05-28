const mongoose = require('mongoose'); //=> Importe 'mongoose'

const uniqueValidator = require('mongoose-unique-validator'); //=> Importe le package 'unique-validator'

const userSchema = mongoose.Schema({ //=> Schéma user
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);