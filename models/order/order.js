const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSchemaValidationErrors, handleSchemaStatusModify } = require('../../utils/helpers');
const { address } = require('../../config');
const { handleCertificateValidation } = require('../../utils/helpers');
const { certificateValidator, certificateValidatorJoi } = handleCertificateValidation;

const phoneRegex = /^\+380[0-9]{9}$/;
const pibRegEx = /^[\sА-Яа-яІіЇїЄєҐґЁё'-]+$/;
const cityRegEx = /^[\sА-Яа-яІіЇїЄєҐґЁё'-.]+$/;
const buildingRegEx = /^\d[0-9А-Яа-яІіЇїЄєҐґЁё-]*$/;
// const flatNumberRegEx = /^\d+$/;
const emailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;

const orderSchema = new Schema(
  {
    maxQuantity: {
      type: Number,
      required: true,
    },
    confirmedPersons: {
      type: Number,
      default: null,
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
          default: '',
        },
        certificateNumber: {
          type: String,
          validate: {
            validator: certificateValidator,
          },
          required: true,
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
        dataProcessingAgreement: {
          type: Boolean,
          default: true,
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
  issueTime: Joi.string().required(),
});

const addPersonToOrderSchema = Joi.object({
  name: Joi.string().pattern(pibRegEx).required(),
  email: Joi.string().email().required(),
  surname: Joi.string().pattern(pibRegEx).required(),
  patrname: Joi.string().pattern(pibRegEx).required(),
  street: Joi.string().pattern(cityRegEx).required(),
  building: Joi.string().pattern(buildingRegEx).required(),
  apartment: Joi.string(),
  certificateNumber: Joi.string().custom(certificateValidatorJoi).required(),
  settlementFrom: Joi.string(),
  regionFrom: Joi.string().valid(...address.areaCollection),
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
