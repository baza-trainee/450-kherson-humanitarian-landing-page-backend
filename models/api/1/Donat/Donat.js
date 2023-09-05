const { Schema, model} = require('mongoose');

const Donat = new Schema({
  currency: { type: String, required: true },
  recipient: { type: String, required: true },
  IBAN: { type: String, required: true },
  IPN: { type: String, required: true },
  paymentPurpose: { type: String, required: true }
});

module.exports = model('Donat', Donat);