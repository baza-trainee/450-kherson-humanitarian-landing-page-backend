const moment = require('moment');
const { Order } = require('../../models');

const checkIssueDateAndUpdateStatus = async function (req, res, next) {
  try {
    console.log('triggered checkIssueDateAndUpdateStatus');
    const currentDate = moment().startOf('day'); // Get the current date without time
    // Find orders with issueDate in the past and status is not 'archived'
    const ordersToUpdate = await Order.find({
      issueDate: { $lt: currentDate },
      status: { $ne: 'archived' },
      // lastUpdated: { $lt: currentDate }, // Add this condition to skip if already updated today
    });

    // Update the status of found orders to 'archive'
    if (ordersToUpdate.length > 0) {
      await Order.updateMany(
        { _id: { $in: ordersToUpdate.map(order => order._id) } },
        { $set: { status: 'archived', lastUpdated: new Date() } } // Update lastUpdated field
      );
    }
    // Find unique order types (excluding 'archived')
    const uniqueTypes = await Order.distinct('type', { status: { $ne: 'archived' } });

    for (const type of uniqueTypes) {
      // Check if there are any active orders of this type
      const activeOrders = await Order.exists({ type, status: 'active' });

      if (!activeOrders) {
        // Find the next closest 'ready' order of this type
        const nextReadyOrder = await Order.findOne({
          type,
          status: 'ready',
          issueDate: { $gte: currentDate },
        }).sort('issueDate');

        if (nextReadyOrder) {
          // Update the status of the next closest 'ready' order to 'active'
          await Order.findByIdAndUpdate(nextReadyOrder._id, { status: 'active' });
        }
      }
    }

    next();
  } catch (error) {
    console.error('Error in checkIssueDateAndUpdateStatus middleware:', error);
    next(error);
  }
};

module.exports = checkIssueDateAndUpdateStatus;
