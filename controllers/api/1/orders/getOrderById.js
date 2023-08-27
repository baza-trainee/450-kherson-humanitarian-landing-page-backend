const { Order } = require('../../../../models');
const { HttpError } = require('../../../../utils/helpers');

const getById = async (req, res) => {
  const { orderId } = req.params;

  const result = await Order.findById(orderId);
  if (!result) {
    throw HttpError(404, 'Contact not found');
  }

  // Filter out persons with isActive: false and count isActive: true
  const activePersons = result.persons.filter(person => person.isActive);
  const activePersonsCount = activePersons.length;

  // Create a copy of the result and modify the persons array
  const sanitizedResult = { ...result.toObject() };
  sanitizedResult.persons = activePersons;
  sanitizedResult.activePersonsCount = activePersonsCount;

  res.json(sanitizedResult);
};
module.exports = getById;
