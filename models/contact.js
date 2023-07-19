const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSchemaValidationErrors } = require('../helpers');
// const { address } = require('../constants');

const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
const nameRegEx = /^[а-яА-ЯёЁіІa-zA-Z-`\s]+$/;
const passportSeriesRegex = /^([А-ЯІ]{2})$/;
const passportNumberRegex = /^[0-9]{6}$/;
const idCardRegex = /^[0-9]{9}$/gm;
const cityRegex = /^[а-яА-ЯёЁіІ\-`\s]+$/gm;
const flatNumberRegex = /^[0-9]{1,9}$/gm;
// const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z]{2,5}){1,2}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      match: nameRegEx,
      required: [true, 'Будь ласка введіть коректне значення імені'],
    },
    surname: {
      type: String,
      match: nameRegEx,
      required: [true, 'Будь ласка введіть коректне значення прізвища'],
    },
    patronymic: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      match: cityRegex,
      required: [true, 'Будь ласка введіть правильну назву міста'],
    },
    street: {
      type: String,
      match: cityRegex,
      default: '',
    },
    houseNumber: {
      type: String,
      default: '',
    },

    flatNumber: {
      type: String,
      match: flatNumberRegex,
      default: '',
    },
    documentType: {
      type: String,
      require: true,
      enum: ['idCard', 'passport'],
    },
    passportSeries: {
      type: String,
      match: passportSeriesRegex,
      default: '',
    },
    passportNumber: {
      type: String,
      match: passportNumberRegex,
      default: '',
    },
    idCard: {
      type: String,
      match: idCardRegex,
      default: '',
    },

    phone: {
      type: String,
      required: true,
      match: phoneRegex,
      unique: true,
    },
    // favorite: {
    //   type: Boolean,
    //   default: false,
    // },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    // email: {
    //   type: String,
    //   unique: true,
    //   required: [true, 'Email address is required'],
    // },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleSchemaValidationErrors);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegex).required(),
  // favorite: Joi.boolean(),
  // colum: Joi.string()
  //   .valid(...collections)
  //   .required(),
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
