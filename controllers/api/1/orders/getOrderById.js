const { Order } = require('../../../../models');
const { HttpError } = require('../../../../utils/helpers');

const getById = async (req, res) => {
  const { orderId } = req.params;

  const result = await Order.findById(orderId);
  if (!result) {
    throw HttpError(404, 'Contact not found');
  }
  res.json(result);
};
module.exports = getById;
