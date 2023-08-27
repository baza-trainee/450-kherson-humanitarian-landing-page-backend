const { Order } = require('../../../../models');

const getAll = async (req, res) => {
  // const { _id: owner } = req.user;
  const { type = '', status = '' } = req.query;

  // Build the query based on the provided parameters
  const query = {};
  if (type) {
    query.type = type;
  }
  if (status) {
    query.status = status;
  }
  const result = await Order.find(query, '-createdAt, -persons');
  res.json(result);
};

module.exports = getAll;
