const { Schema, model } = require("mongoose");
const Picture = require("./Common/Picture");

const Fund = new Schema({
  picture: { type: Picture, required: true },
});

module.exports = model("Fund", Fund);
