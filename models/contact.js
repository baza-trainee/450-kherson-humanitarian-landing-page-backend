const { Schema, model } = require('mongoose');

const collections = ['one', 'two', 'three'];
const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

const contactSchema = new Schema({
  name: {
    type: 'string',
    required: true,
  },
  email: {
    type: 'string',
    required: true,
  },
  phone: {
    type: 'string',
    required: true,
    match: phoneRegex,
    unique: true,
  },
  favorite: {
    type: 'boolean',
    default: false,
  },
  colum: {
    type: 'string',
    enum: collections,
    default: 'one',
  },
});

const Contact = model('contact', contactSchema);

module.exports = Contact;

// ,
//   favorite: {
//     type: 'boolean',
//     default: false,
//   },
//   collection: {
//     type: 'string',
//     enum: collections,
//   },
