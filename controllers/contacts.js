const { Contact } = require('../models/contact');
const { HttpError, ctrlWrapper } = require('../helpers');

const getAll = async (req, res) => {
  const result = await Contact.find({}, '-createdAt');
  console.log(result);
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, 'Contact not found');
  }
  res.json(result);
};

const createContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Contact not found');
  }
  res.json(result);
};
// const updateContactFavorite = async (req, res) => {
//   const { id } = req.params;
//   const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
//   if (!result) {
//     throw HttpError(404, 'Contact not found');
//   }
//   res.json(result);
// };

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, 'Contact not found');
  }
  res.json({
    message: 'Contact removed successfully',
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  createContact: ctrlWrapper(createContact),
  getContactById: ctrlWrapper(getContactById),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
};
