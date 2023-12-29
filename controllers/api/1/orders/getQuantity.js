const { Order } = require('../../../../models');

const getQuantity = async (req, res) => {
  const { type = '', status = '' } = req.query;

  // Build the query based on the provided parameters
  const query = {};
  if (type) {
    query.type = type;
  }
  if (status) {
    query.status = status;
  }
  const result = await Order.find(
    query,
    '-createdAt -persons -issueDate -createdDate -changedDate -closeDate -updatedAt -status -unparsedDate'
  );
  res.json(result);
};

module.exports = getQuantity;
