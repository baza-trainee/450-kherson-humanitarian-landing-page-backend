const { Schema, model} = require('mongoose');

const Contacts = new Schema({
  email: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true }
});

module.exports = model('Contacts', Contacts);