const moment = require('moment');
const { Order } = require('../../../../models');

const addOrder = async (req, res) => {
  // const { _id: owner } = req.user;

  const newOrderData = req.body;

  const parsedIssueDate = moment.utc(newOrderData.issueDate, 'DD.MM.YYYY');
  const parsedIssueTime = moment(newOrderData.issueTime, 'HH:mm');

  const combinedIssueDateTime = parsedIssueDate
    .hours(parsedIssueTime.hours())
    .minutes(parsedIssueTime.minutes())
    .toISOString();

  newOrderData.issueDate = combinedIssueDateTime;

  delete newOrderData.issueTime;

  // Check if an order with the same issueDate already exists
  const existingOrder = await Order.findOne({
    issueDate: newOrderData.issueDate,
  });

  if (existingOrder) {
    return res.status(400).json({ message: 'An order with the same issue date already exists.' });
  }

  const result = await Order.create(newOrderData);

  const responseResult = {
    _id: result._id,
    maxQuantity: result.maxQuantity,
    issueDate: result.issueDate,
    type: result.type,
    createdDate: result.createdDate,
    status: result.status,
    // Add other fields you want to include in the response
  };

  res.status(201).json(responseResult);
};

module.exports = addOrder;
