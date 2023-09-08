const { Order } = require('../../../../models');
const { HttpError } = require('../../../../utils/helpers');

const getPersonById = async (req, res) => {
  const { orderId, link } = req.params;

  try {
    const existingOrder = await Order.findById(orderId);

    if (!existingOrder) {
      throw HttpError(404, 'Order not found');
    }

    const person = existingOrder.persons.find(person => person.id === link);
    if (!person) {
      throw HttpError(404, 'Person not found in order');
    }

    const orderInfo = {
      issueDate: existingOrder.issueDate,
      // issueAddress: existingOrder.street + ', ' + existingOrder.building,
    };

    const personInfo = {
      name: person.name,
      surname: person.surname,
      patrname: person.patrname,
    };

    return res.status(200).json({ order: orderInfo, person: personInfo });
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ error: error.message || 'Internal Server Error' });
  }
};

module.exports = getPersonById;
