const { Schema, model } = require("mongoose");
const Picture = require("./Common/Picture");

const History = new Schema({
  picture: { type: Picture, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
});

module.exports = model("History", History);
