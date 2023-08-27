const { Order } = require('../../../../models');
const { HttpError } = require('../../../../utils/helpers');

const activatePerson = async (req, res) => {
  const { orderId, link } = req.params;

  try {
    const existingOrder = await Order.findById(orderId);

    if (!existingOrder) {
      throw HttpError(404, 'Order not found');
    }

    const personIndex = existingOrder.persons.findIndex(person => person.id === link);
    if (personIndex === -1) {
      throw HttpError(404, 'Person not found in order');
    }

    // Update isActivated field of the person
    existingOrder.persons[personIndex].isActivated = true;

    await existingOrder.save();

    return res.status(200).json({ message: 'Person activated successfully' });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ error: error.message || 'Internal Server Error' });
  }
};

module.exports = activatePerson;
