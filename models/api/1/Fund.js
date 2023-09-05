const { Schema, model} = require('mongoose');
const Picture = require('./Common/Picture');

const Fund = new Schema({
  picture: Picture
});

module.exports = model('Fund', Fund);