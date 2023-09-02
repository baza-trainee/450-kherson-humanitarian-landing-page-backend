const { Schema, model} = require('mongoose');
const Picture = require('../Common/Picture');

const View = new Schema({
  picture: Picture,
  bgColorStart: { type: String, required: true },
  bgColorEnd: { type: String, required: true }
});

module.exports = model('View', View);