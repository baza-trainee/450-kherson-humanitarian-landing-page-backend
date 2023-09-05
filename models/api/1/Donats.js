const { Schema, model} = require('mongoose');
const Donat = require('./Donat/Donat');

const Donats = new Schema({
  donats: [{ type: Donat, required: true }]
});

module.exports = model('Donats', Donats);