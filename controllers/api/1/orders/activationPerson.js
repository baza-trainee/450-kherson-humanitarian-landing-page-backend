const { Order } = require('../../../../models');
const { HttpError } = require('../../../../utils/helpers');
const updateNextClosestReadyOrder = require('../../../../utils/helpers/orders/updateNextClosestReadyOrder');

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

    // Increase confirmedPersons count if the person is activated
    if (existingOrder.persons[personIndex].isActivated) {
      existingOrder.confirmedPersons = (existingOrder.confirmedPersons || 0) + 1;

      if (existingOrder.confirmedPersons >= existingOrder.maxQuantity) {
        existingOrder.status = 'complete';
      }
    }

    await existingOrder.save();

    // TODO Causing a problem with circular dependency
    if (existingOrder.status === 'complete') {
      await updateNextClosestReadyOrder(existingOrder.type);
    }

    // const frontendRedirectURL = `https://450kr.com/something?=${orderId}&${link}`;
    // return res.redirect(frontendRedirectURL);

    return res.status(200).json({ message: 'Person activated successfully' });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ error: error.message || 'Internal Server Error' });
  }
};

module.exports = activatePerson;
