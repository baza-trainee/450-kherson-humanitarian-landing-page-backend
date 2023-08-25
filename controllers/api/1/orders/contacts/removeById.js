const { Contact } = require('../../models');
const { HttpError } = require('../../helpers');

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, 'Contact not found');
  }
  res.json({
    message: 'Contact removed successfully',
  });
};

module.exports = removeById;
