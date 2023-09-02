const { Schema, model} = require('mongoose');

const Achievements = new Schema({
  issuedHumanitarianKits: { type: Number },
  receivedHumanitarianAid: { type: Number },
  sumDonats: { type: Number },
  infoAtDate: {type: Date | DateTime},
});

module.exports = model('Achievements', Achievements);