const { Schema, model} = require('mongoose');

const History = new Schema({
  picture: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
});

module.exports = model('History', History);