const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSchemaValidationErrors, handlePassportValidation } = require('../helpers');
const { address } = require('../constants');

const { passportValidator, passportValidatorJoi } = handlePassportValidation;

const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
const nameRegEx = /^[а-яА-ЯёЁіІa-zA-Z-`\s]+$/;
// const passportSeriesRegex = /^([А-ЯІ]{2})$/;
// const passportNumberRegex = /^[0-9]{6}$/;
const cityRegEx = /^[а-яА-ЯёЁіІїЇ\-`\s]+$/;
const flatNumberRegEx = /^[0-9]{1,9}$/;
const identificationNumberRegEx = /^[0-9]{12}$/;
const idpCertificateNumberRegEx = /^\d{4}-\d{10}$/;
const documentType = ['idCard', 'passport'];

const idpHelpSchema = new Schema(
  {
    maxQuantity: {
      type: Number,
      required: true,
    },
    status: {},
    persons: [
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
        // passportSeries: {
        //   type: String,
        //   match: passportSeriesRegex,
        //   default: '',
        // },
        // passportNumber: {
        //   type: String,
        //   match: passportNumberRegex,
        //   default: '',
        // },

        passport: {
          type: String,
          require: true,
          validate: {
            validator: passportValidator,
            message:
              'Passport should be either 9 digits or 2 capital letters followed by 6 digits.',
          },
        },
        // idCard: {
        //   type: String,
        //   match: idCardRegex,
        //   require: true,
        // },
        identificationNumber: {
          type: String,
          match: identificationNumberRegEx,
          require: true,
        },
        idpCertificateNumber: {
          type: String,
          match: idpCertificateNumberRegEx,
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
    ],
  },
  { versionKey: false, timestamps: true }
);

idpHelpSchema.post('save', handleSchemaValidationErrors);

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
  // passportSeries: Joi.string().pattern(passportSeriesRegex),
  // passportNumber: Joi.string().pattern(passportNumberRegex),
  // idCard: Joi.string().pattern(idCardRegex),
  identificationNumber: Joi.string().pattern(identificationNumberRegEx).required(),
  idpCertificateNumber: Joi.string().pattern(idpCertificateNumberRegEx),
  movementArea: Joi.string().valid(...address.areaCollection),
  movementCity: Joi.string(),
  numberOfFamilyMembers: Joi.number(),
  phone: Joi.string().pattern(phoneRegex).required(),
});

const idpHelpJoiSchemas = {
  addSchema,
};

const IdpHelp = model('idpHelp', idpHelpSchema);

module.exports = {
  IdpHelp,
  idpHelpJoiSchemas,
};
