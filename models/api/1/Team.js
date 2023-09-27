const { Schema, model } = require("mongoose");
const Picture = require("./Common/Picture");

const Team = new Schema({
  picture: Picture,
  title: { type: String, required: true },
  text: { type: String, required: true },
});

module.exports = model("Team", Team);
