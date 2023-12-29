const moment = require("moment-timezone");
const { ObjectId } = require("mongoose").Types;
const { HttpError, createVerifyEmail } = require("../../../../utils/helpers");
const { Order } = require("../../../../models");
require("dotenv").config();
const { urls } = require("../../../../config/app");

const TIMEZONE = "Europe/Kiev";

const addPersonToOrder = async (req, res) => {
    const { orderId: id } = req.params;
    const newPersonData = req.body;

    newPersonData._id = new ObjectId();

    const existingOrder = await Order.findById(id);
    if (!existingOrder) {
        throw HttpError(432, `Список не знайдено`);
    }
    if (existingOrder.status !== "active") {
        throw HttpError(433, "Список не активний");
    }

    // Check if the order is complete or maxQuantity is reached
    if (
        existingOrder.status === "complete" ||
        existingOrder.status === "archived" ||
        existingOrder.confirmedPersons >= existingOrder.maxQuantity
    ) {
        throw HttpError(434, "Список заповнений чи знаходиться в архіві");
    }
    const isDuplicate = existingOrder.persons.some(
        (person) => person.email === newPersonData.email
    );

    if (isDuplicate) {
        throw HttpError(435, "Імейл вже зареєстрований");
    }

    const currentTime = moment().tz(TIMEZONE);

    const activationLink = `${urls.APP_URL}/api/v1/order/activate/${id}/${newPersonData._id}`;

    const newPerson = { ...newPersonData, activationLink };

    const updatedOrder = await Order.findByIdAndUpdate(
        id,
        {
            $push: { persons: newPerson },
            $set: { changedDate: currentTime },
        },
        { new: true }
    );
    if (!updatedOrder) {
        throw HttpError(436, "Список не оновлено");
    }

    await createVerifyEmail(id, newPerson);

    return res
        .status(201)
        .json({ user: newPersonData, message: "Людина додана успішно" });
};

module.exports = addPersonToOrder;
