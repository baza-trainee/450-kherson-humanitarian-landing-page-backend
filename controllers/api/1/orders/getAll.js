const { Order } = require('../../../../models');

const getAll = async (req, res) => {
  const { type = '', status = '' } = req.query;

  const query = {};
  if (type) {
    query.type = type;
  }
  if (status) {
    query.status = status;
  }
  const result = await Order.find(query, '-createdAt -updatedAt -persons');
  res.json(result);
};

module.exports = getAll;
