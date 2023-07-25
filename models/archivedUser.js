const { Schema, model } = require('mongoose');

const { handleSchemaValidationErrors } = require('../helpers');

const { address } = require('../constants');

const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
const nameRegEx = /^[а-яА-ЯёЁіІa-zA-Z-`\s]+$/;
const passportSeriesRegex = /^([А-ЯІ]{2})$/;
const passportNumberRegex = /^[0-9]{6}$/;
const idCardRegex = /^[0-9]{9}$/;
const cityRegEx = /^[а-яА-ЯёЁіІїЇ\-`\s]+$/;
const flatNumberRegEx = /^[0-9]{1,9}$/;
const identificationNumberRegEx = /^[0-9]{12}$/;
const idpCertificateNumberRegEx = /^\d{4}-\d{10}$/;
const documentType = ['idCard', 'passport'];

const archivedUserSchema = new Schema({
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
});
archivedUserSchema.post('save', handleSchemaValidationErrors);

const ArchivedUser = model('archivedUser', archivedUserSchema);

module.exports = {
  ArchivedUser,
};
