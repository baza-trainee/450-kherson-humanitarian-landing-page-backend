const { Order } = require('../../../../models');
const { HttpError } = require('../../../../utils/helpers');

const removeOrderById = async (req, res) => {
  const { orderId } = req.params;
  const result = await Order.findByIdAndDelete(orderId);
  if (!result) {
    throw HttpError(404, 'Order not found');
  }
  res.json({ message: 'Order deleted successfully', deletedOrder: result });
};
module.exports = removeOrderById;
