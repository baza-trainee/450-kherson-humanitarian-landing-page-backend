const { Order } = require("../../../../models");
const { HttpError } = require("../../../../utils/helpers");

const getById = async (req, res) => {
    const { orderId } = req.params;

    const result = await Order.findById(orderId);
    if (!result) {
        throw HttpError(432, "Список не знайдено");
    }

    // Filter out persons with isActive: false and count isActive: true
    const activePersons = result.persons.filter((person) => person.isActivated);
    const allPersons = result.persons;

    // Create a copy of the result and modify the persons array
    const sanitizedResult = { ...result.toObject() };
    sanitizedResult.persons = activePersons;
    sanitizedResult.allPersons = allPersons;

    res.json(sanitizedResult);
};
module.exports = getById;
