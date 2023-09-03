const { Schema, model} = require('mongoose');

const Logos = new Schema({
  pictures: { type: Picture}
});

module.exports = model('Logos', Logos);