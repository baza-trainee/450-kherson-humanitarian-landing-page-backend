const { Schema, model} = require('mongoose');

const Title = new Schema({
  text: { type: String, required: true },
  colorStart: { type: String, required: true },
  colorMiddle: { type: String, required: true },
  colorEnd: { type: String, required: true }
});

module.exports = model('Title', Title);