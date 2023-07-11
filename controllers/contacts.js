const Joi = require('joi');
const contacts = require('../models/contacts');
const { HttpError, ctrlWrapper } = require('../helpers');

const addScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const getAll = async (req, res) => {
  const result = await contacts.getAll();
  console.log(result);
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw HttpError(404, 'Contact not found');
  }
  res.json(result);
};

const createContact = async (req, res) => {
  const { error } = addScheme.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { error } = addScheme.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, 'Contact not found');
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContactById(id);
  if (!result) {
    throw HttpError(404, 'Contact not found');
  }
  res.json({
    message: 'Contact removed successfully',
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getContactById: ctrlWrapper(getContactById),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
};
