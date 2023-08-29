const { Order } = require('../../../models');
const moment = require('moment');

// Function to find and update next closest 'ready' order
const updateNextClosestReadyOrder = async orderType => {
  try {
    // Get the current date
    const currentDate = moment().startOf('day');

    // Find the next closest 'ready' order of the same type
    const nextReadyOrder = await Order.findOne({
      type: orderType,
      status: 'ready',
      issueDate: { $gte: currentDate },
    }).sort('issueDate'); // Sort by issueDate in ascending order to get the closest one

    if (nextReadyOrder) {
      // Update the status of the next closest 'ready' order to 'active'
      await Order.findByIdAndUpdate(nextReadyOrder._id, { status: 'active' });
    }
  } catch (error) {
    console.error('Error updating next closest ready order:', error);
  }
};

module.exports = updateNextClosestReadyOrder;
