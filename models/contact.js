const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleSaveError } = require('../middlewares');

const collections = ['one', 'two', 'three'];
const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

const contactSchema = new Schema(
  {
    name: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
    },
    phone: {
      type: 'string',
      required: true,
      match: phoneRegex,
      unique: true,
    },
    favorite: {
      type: 'boolean',
      default: false,
    },
    colum: {
      type: 'string',
      enum: collections,
      default: 'one',
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleSaveError);

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

const schemas = {
  addSchema,
  updateFavorite,
};

const Contact = model('contact', contactSchema);

module.exports = { Contact, schemas };
