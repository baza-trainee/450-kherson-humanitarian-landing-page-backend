const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSchemaValidationErrors } = require('../helpers');

const collections = ['one', 'two', 'three'];
const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email address is required'],
    },
    phone: {
      type: String,
      required: true,
      match: phoneRegex,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    colum: {
      type: String,
      enum: collections,
      default: 'one',
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleSchemaValidationErrors);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegex).required(),
  favorite: Joi.boolean(),
  colum: Joi.string()
    .valid(...collections)
    .required(),
});
const updateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactSchemas = {
  addSchema,
  updateFavorite,
};

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  contactSchemas,
};
