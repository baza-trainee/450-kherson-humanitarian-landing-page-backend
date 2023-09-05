const { Schema, model} = require('mongoose');

const Documents = new Schema({
  rules: { type: String, required: true },
  publicOfferContract: { type: String, required: true },
  privacy: { type: String, required: true },
  statut: { type: String, required: true },
  reporting: { type: String, required: true }
});

module.exports = model('Documents', Documents);