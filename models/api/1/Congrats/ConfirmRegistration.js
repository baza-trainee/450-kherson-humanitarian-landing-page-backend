const { Schema, model} = require('mongoose');

const ConfirmRegistration = new Schema({
  chapterText: { type: String, required: true }
});

module.exports = model('ConfirmRegistration', ConfirmRegistration);