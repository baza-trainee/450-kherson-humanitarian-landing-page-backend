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

  res.status(201).json(result);
};

module.exports = addOrder;
