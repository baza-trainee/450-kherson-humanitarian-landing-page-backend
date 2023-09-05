const { Schema, model} = require('mongoose');

const Team = new Schema({
  picture: Picture,
  title: { type: String, required: true },
  text: { type: String, required: true },
});

module.exports = model('Team', Team);