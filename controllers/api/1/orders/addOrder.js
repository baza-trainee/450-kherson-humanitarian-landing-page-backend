const moment = require('moment');
const { Order } = require('../../../../models');
const addOrder = async (req, res) => {
  // const { _id: owner } = req.user;
  const newOrderData = req.body;
  const parsedIssueDate = moment(newOrderData.issueDate, 'DD.MM.YYYY').toDate();
  newOrderData.issueDate = parsedIssueDate;
  const result = await Order.create(newOrderData);
  // await Contact.aggregate([{ $match: {} }, { $out: 'collection2' }]);

  res.status(201).json(result);
};

module.exports = addOrder;
