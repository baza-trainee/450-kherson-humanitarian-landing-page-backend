const moment = require('moment-timezone');
const { ObjectId } = require('mongoose').Types;
const { HttpError, createVerifyEmail } = require('../../../../utils/helpers');
const { Order } = require('../../../../models');
require('dotenv').config();

const { BASE_URL } = process.env;

const TIMEZONE = 'Europe/Kiev';

const addPersonToOrder = async (req, res) => {
  const { orderId: id } = req.params;
  const newPersonData = req.body;

  newPersonData._id = new ObjectId();

  const existingOrder = await Order.findById(id);
  if (!existingOrder) {
    throw HttpError(404, 'Order not found');
  }
  const isDuplicate = existingOrder.persons.some(
    person => person.email === newPersonData.email || person.phone === newPersonData.phone
  );

  if (isDuplicate) {
    throw HttpError(400, 'Duplicate email or phone in order');
  }
  const newPerson = { ...newPersonData };

  const currentTime = moment().tz(TIMEZONE); // Get time on 3 hour early

  const activationLink = `${BASE_URL}/api/v1/order/activate/${id}/${newPerson._id}`;
  const updatedOrder = await Order.findByIdAndUpdate(
    { _id: id, 'persons._id': newPerson._id },
    {
      $push: { persons: newPerson },
      $set: { 'persons.$.activationLink': activationLink, changedDate: currentTime },
    },
    { new: true }
  );
  if (updatedOrder.nModified === 0) {
    throw HttpError(404, 'Order not found');
  }
  // await createVerifyEmail(id, newPerson);

  return res.status(201).json({ user: newPerson, message: 'Person added to order successfully' });
};

module.exports = addPersonToOrder;
