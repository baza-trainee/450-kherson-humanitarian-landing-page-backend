const { Order } = require('../../../../models');

const getAll = async (req, res) => {
  // const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Order.find({}, '-createdAt, -persons', { skip, limit });
  res.json(result);
};

module.exports = getAll;
