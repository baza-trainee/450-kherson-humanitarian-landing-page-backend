const { Schema, model} = require('mongoose');

const History = new Schema({
  text: { type: String, required: true },
  colorStart: { type: String, required: true },
  colorMiddle: { type: String, required: true },
  colorEnd: { type: String, required: true },
});

module.exports = model('History', History);