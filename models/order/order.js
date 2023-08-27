const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSchemaValidationErrors, handleSchemaStatusModify } = require('../../utils/helpers');
const { address } = require('../../config');
const { handleCertificateValidation } = require('../../utils/helpers');
const { certificateValidator, certificateValidatorJoi } = handleCertificateValidation;

const phoneRegex = /^[+]?(380)[\s][0-9]{2}[\s][0-9]{3}[\s]?[0-9]{2}[\s]?[0-9]{2}[\s]?$/;
const pibRegEx = /^[\sА-Яа-яІіЇїЄєҐґЁё'-]+$/;
const cityRegEx = /^[\sА-Яа-яІіЇїЄєҐґЁё'-.]+$/;
const buildingRegEx = /^\d[0-9А-Яа-яІіЇїЄєҐґЁё-]*$/;
const flatNumberRegEx = /^\d+$/;
const emailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;

const idpCertificateNumberRegEx = /^\d{4}-\d{10}$/;

const orderSchema = new Schema(
  {
    maxQuantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'ready', 'archive', 'complete'],
    },
    issueDate: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: ['temp_moved', 'invalid', 'child'],
    },
    persons: [
      {
        name: {
          type: String,
          match: pibRegEx,
          required: [true, 'Поле може містити тільки кирилицю, пробіл, дефіс та апостроф'],
        },
        email: {
          type: String,
          match: emailRegEx,
          required: true,
        },
        surname: {
          type: String,
          match: pibRegEx,
          required: [true, 'Поле може містити тільки кирилицю, пробіл, дефіс та апостроф'],
        },
        patrname: {
          type: String,
          match: pibRegEx,
          required: [true, 'Поле може містити тільки кирилицю, пробіл, дефіс та апостроф'],
        },

        street: {
          type: String,
          match: cityRegEx,
          required: true,
          default: '',
        },
        building: {
          type: String,
          match: buildingRegEx,
          required: true,
          default: '',
        },

        apartment: {
          type: String,
          match: flatNumberRegEx,
          default: '',
        },
        CertificateNumber: {
          type: String,
          validate: {
            validator: certificateValidator,
          },
          default: '',
        },
        settlementFrom: {
          type: String,
          default: '',
        },
        regionFrom: {
          type: String,
          validate: {
            validator: function (value) {
              return address.areaCollection.includes(value);
            },
            message: 'Invalid region value',
          },
        },

        memberNumber: {
          type: Number,
          default: '',
        },
        phone: {
          type: String,
          required: true,
          match: phoneRegex,
        },
        isActivated: {
          type: Boolean,
          default: false,
        },
        activationLink: {
          type: String,
          default: '',
        },
      },
    ],
    createdDate: {
      type: Date,
      default: new Date(),
    },
    changedDate: {
      type: Date,
      default: '',
    },
    closeDate: {
      type: Date,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

orderSchema.post('save', handleSchemaValidationErrors);
orderSchema.pre('save', handleSchemaStatusModify);

const addSchema = Joi.object({
  maxQuantity: Joi.number().required(),
  status: Joi.string().valid('active', 'ready', 'archive', 'complete'),
  type: Joi.string().valid('temp_moved', 'invalid', 'child'),
  issueDate: Joi.string().required(),
});

const addPersonToOrderSchema = Joi.object({
  name: Joi.string().pattern(pibRegEx).required(),
  email: Joi.string().email().required(),
  surname: Joi.string().pattern(pibRegEx).required(),
  patrname: Joi.string().pattern(pibRegEx).required(),
  street: Joi.string().pattern(cityRegEx).required(),
  building: Joi.string(),
  apartment: Joi.string().pattern(flatNumberRegEx),
  CertificateNumber: Joi.string().custom(certificateValidatorJoi).required(),
  settlementFrom: Joi.string(),
  regionFrom: Joi.string().valid(...address.areaCollection),
  memberNumber: Joi.number(),
  phone: Joi.string().pattern(phoneRegex).required(),
});

const orderJoiSchemas = {
  addSchema,
  addPersonToOrderSchema,
};

const Order = model('order', orderSchema);

module.exports = {
  Order,
  orderJoiSchemas,
};
