const { Schema, model} = require('mongoose');

const IssuePoint = new Schema({
  locationDeliveryPoint: { type: String, required: true },
  geolocation: { type: String, required: true }
});

module.exports = model('IssuePoint', IssuePoint);