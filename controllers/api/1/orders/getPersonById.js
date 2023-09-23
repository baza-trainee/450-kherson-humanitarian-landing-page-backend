const { Order } = require("../../../../models");
const { HttpError } = require("../../../../utils/helpers");

const getPersonById = async (req, res) => {
    const { orderId, link } = req.params;

    try {
        const existingOrder = await Order.findById(orderId);

        if (!existingOrder) {
            throw HttpError(432, "Список не знайдено");
        }

        const person = existingOrder.persons.find(
            (person) => person.id === link
        );
        if (!person) {
            throw HttpError(437, "Людина не знайдена у списку");
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
            .json({ error: error.message || "Помилка на боці сервера" });
    }
};

module.exports = getPersonById;
