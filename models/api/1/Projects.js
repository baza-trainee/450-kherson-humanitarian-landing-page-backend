const { Schema, model} = require('mongoose');
const Picture = require('./Common/Picture');

const Projects = new Schema({
  mainPicture: Picture,
  title: {type: String},
  awaitingFunding: {type: String},
  inProcess: {type: String},
  completed: {type: String},
  pictures: [{type: Picture}],
  subTitle: {type: String},
  text: {type: String},
  areaCompletedWorks: {type: String},
  projectDuration: {type: String},
  projectText: {type: String},
});

module.exports = model('Projects', Projects);