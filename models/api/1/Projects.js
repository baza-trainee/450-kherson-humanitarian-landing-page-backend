const { Schema, model } = require("mongoose");
const Picture = require("./Common/Picture");

const Projects = new Schema({
  title: { type: String, required: true },
  // funding-await, in-process, completed
  stage: { type: String, required: true },
  videoLink: { type: String, required: true },
  subTitle: { type: String, required: true },
  text: { type: String, required: true },
  areaCompletedWorks: { type: String, required: true },
  projectDuration: { type: String, required: true },
  projectText: { type: String, required: true },
  mainPicture: Picture,
  pictures: [{ type: Picture }],
});

module.exports = model("Projects", Projects);
