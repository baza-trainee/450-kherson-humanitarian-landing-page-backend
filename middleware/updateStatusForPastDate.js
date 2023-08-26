const moment = require('moment');

const checkIssueDateAndUpdateStatus = async function (req, res, next) {
  try {
    const currentDate = moment().startOf('day'); // Get the current date without time

    // Find orders with issueDate in the past and status is not 'archived'
    const ordersToUpdate = await this.find({
      issueDate: { $lt: currentDate },
      status: { $ne: 'archived' },
      lastUpdated: { $lt: currentDate }, // Add this condition to skip if already updated today
    });

    // Update the status of found orders to 'archive'
    if (ordersToUpdate.length > 0) {
      await this.updateMany(
        { _id: { $in: ordersToUpdate.map(order => order._id) } },
        { $set: { status: 'archived', lastUpdated: new Date() } } // Update lastUpdated field
      );
    }

    next();
  } catch (error) {
    console.error('Error in checkIssueDateAndUpdateStatus middleware:', error);
    next(error);
  }
};

module.exports = checkIssueDateAndUpdateStatus;
