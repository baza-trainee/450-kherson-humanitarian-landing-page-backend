const { Schema, model } = require("mongoose");
const Picture = require("./Common/Picture");

const Logos = new Schema({
  picture: { type: Picture },
});

module.exports = model("Logos", Logos);
