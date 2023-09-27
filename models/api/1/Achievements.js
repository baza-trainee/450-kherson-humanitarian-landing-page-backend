const { Schema, model } = require("mongoose");

const Achievements = new Schema({
  issuedHumanitarianKits: { type: Number },
  receivedHumanitarianAid: { type: Number },
  sumDonats: { type: Number },
  infoAtDate: { type: Date },
});

module.exports = model("Achievements", Achievements);
