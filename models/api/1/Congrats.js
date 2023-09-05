const { Schema, model} = require('mongoose');
const ConfirmRegistration = require('./Congrats/ConfirmRegistration');

const Congrats = new Schema({
  confirmRegistration: {type: ConfirmRegistration}
});

module.exports = model('Congrats', Congrats);