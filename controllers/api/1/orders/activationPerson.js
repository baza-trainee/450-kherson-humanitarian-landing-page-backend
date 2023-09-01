const { Order } = require('../../../../models');
const { HttpError } = require('../../../../utils/helpers');
const updateNextClosestReadyOrder = require('../../../../utils/helpers/orders/updateNextClosestReadyOrder');

const activatePerson = async (req, res) => {
  const { orderId, link } = req.params;
  const unsuccessfulFrontendRedirectURL = `https://localhost:3000/notification/unsuccess-registration?orderId=${orderId}&link=${link}`;
  const successfulFrontendRedirectURL = `https://localhost:3000/notification/success-registration?orderId=${orderId}&link=${link}`;

  try {
    const existingOrder = await Order.findById(orderId);

    if (!existingOrder) {
      throw HttpError(404, 'Order not found');
    }

    const personIndex = existingOrder.persons.findIndex(person => person.id === link);
    if (personIndex === -1) {
      throw HttpError(404, 'Person not found in order');
    }

    // Check if the person is already activated
    if (!existingOrder.persons[personIndex].isActivated) {
      // Update isActivated field of the person
      existingOrder.persons[personIndex].isActivated = true;

      // Increase confirmedPersons count if the person is activated
      existingOrder.confirmedPersons = (existingOrder.confirmedPersons || 0) + 1;

      if (existingOrder.confirmedPersons >= existingOrder.maxQuantity) {
        existingOrder.status = 'complete';
      }
    } else {
      // If the person is already activated, you can return an error or a message
      throw HttpError(400, 'Person is already activated');
    }

    await existingOrder.save();

    if (existingOrder.status === 'complete') {
      await updateNextClosestReadyOrder(existingOrder.type);
    }

    return res.redirect(successfulFrontendRedirectURL);
    // return res.status(200).json({ message: 'Person activated successfully' });
  } catch (error) {
    return res.redirect(unsuccessfulFrontendRedirectURL);
    // return res
    //   .status(error.statusCode || 500)
    //   .json({ error: error.message || 'Internal Server Error' });
  }
};

module.exports = activatePerson;
