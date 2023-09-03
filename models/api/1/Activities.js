const { Schema, model} = require('mongoose');
const Picture = require('./Common/Picture');

const Activities = new Schema({
  path: Picture
});

module.exports = model('Activities', Activities);