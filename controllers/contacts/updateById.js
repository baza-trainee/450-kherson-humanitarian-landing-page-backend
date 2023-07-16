const { Contact } = require('../../models');
const { HttpError } = require('../../helpers');

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Contact not found');
  }
  res.json(result);
};

module.exports = updateById;
