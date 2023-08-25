const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSchemaValidationErrors, handlePassportValidation } = require('../helpers');
const { address } = require('../constants');
const { passportValidator, passportValidatorJoi } = handlePassportValidation;

const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
const nameRegEx = /^[а-яА-ЯёЁіІa-zA-Z-`\s]+$/;

const cityRegEx = /^[а-яА-ЯёЁіІїЇ\-`\s]+$/;
const flatNumberRegEx = /^[0-9]{1,9}$/;
const identificationNumberRegEx = /^[0-9]{12}$/;
const documentType = ['idCard', 'passport'];

const disHelpSchema = new Schema(
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
      match: cityRegEx,
      required: [true, 'Будь ласка введіть правильну назву міста'],
    },
    street: {
      type: String,
      match: cityRegEx,
      default: '',
    },
    houseNumber: {
      type: String,
      default: '',
    },

    flatNumber: {
      type: String,
      match: flatNumberRegEx,
      default: '',
    },
    documentType: {
      type: String,
      require: true,
      enum: documentType,
    },
    passport: {
      type: String,
      require: true,
      validate: {
        validator: passportValidator,
        message: 'Passport should be either 9 digits or 2 capital letters followed by 6 digits.',
      },
    },
    identificationNumber: {
      type: String,
      match: identificationNumberRegEx,
      require: true,
    },
    disabilityCertificateNumber: {
      type: String,
      default: '',
    },
    movementArea: {
      type: String,
      match: address.areaCollection,
    },
    movementCity: {
      type: String,
      default: '',
    },
    numberOfFamilyMembers: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      required: true,
      match: phoneRegex,
      unique: true,
    },
  },
  { versionKey: false, timestamps: true }
);

disHelpSchema.post('save', handleSchemaValidationErrors);

const addSchema = Joi.object({
  name: Joi.string().pattern(nameRegEx).required(),
  surname: Joi.string().pattern(nameRegEx).required(),
  patronymic: Joi.string(),
  city: Joi.string().pattern(cityRegEx).required(),
  street: Joi.string().pattern(cityRegEx).required(),
  houseNumber: Joi.string(),
  flatNumber: Joi.string().pattern(flatNumberRegEx),
  documentType: Joi.string().valid(...documentType),
  passport: Joi.string()
    .required()
    .custom(passportValidatorJoi, 'Custom validation for Ukrainian passport'),

  identificationNumber: Joi.string().pattern(identificationNumberRegEx).required(),
  disabilityCertificateNumber: Joi.string().required(),
  movementArea: Joi.string().valid(...address.areaCollection),
  movementCity: Joi.string(),
  numberOfFamilyMembers: Joi.number(),
  phone: Joi.string().pattern(phoneRegex).required(),
});

const disHelpJoiSchemas = {
  addSchema,
};

const DisHelp = model('disHelp', disHelpSchema);

module.exports = {
  DisHelp,
  disHelpJoiSchemas,
};
