const { Schema, model} = require('mongoose');

const Picture = new Schema({
  picture: { type: String, required: true },
});

module.exports = model('Picture', Picture);