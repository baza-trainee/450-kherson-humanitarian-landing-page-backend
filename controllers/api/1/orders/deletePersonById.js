const { Order } = require("../../../../models");
const { HttpError } = require("../../../../utils/helpers");

const deletePersonById = async (req, res) => {
    const orderId = req.params.orderId;
    const personId = req.params.link;
    console.log(orderId, personId);

    const existingOrder = await Order.findById(orderId);
    if (!existingOrder) {
        throw HttpError(432, `Список не знайдено`);
    }

    const personIndex = existingOrder.persons.findIndex(
        (person) => person.id === personId
    );
    if (personIndex === -1) {
        throw HttpError(437, "Людина не знайдена у списку");
    }
    if (existingOrder.persons[personIndex].isActivated) {
        // Remove the person from the persons array
        existingOrder.persons.splice(personIndex, 1);

        // Update confirmedPersons count by subtracting 1
        existingOrder.confirmedPersons =
            (existingOrder.confirmedPersons || 0) - 1;

        // Save the updated order document
    } else {
        throw HttpError(440, "Людина ще не активована");
    }

    // Check if the order is in "complete" status
    const wasComplete = existingOrder.status === "complete";

    // If the order was in "complete" status, set it back to "active"
    if (wasComplete) {
        existingOrder.status = "active";
    }

    // Check for existing active orders of the same type
    const existingActiveOrders = await Order.find({
        type: existingOrder.type,
        status: "active",
        _id: { $ne: existingOrder._id },
    });

    // Change the status of existing active orders to "read"
    if (existingActiveOrders.length > 0) {
        await Promise.all(
            existingActiveOrders.map(async (order) => {
                order.status = "ready";
                await order.save();
            })
        );
    }

    // Save the updated order document
    await existingOrder.save();

    res.status(200).json({ message: "Людина видалена зі списку" });
};

module.exports = deletePersonById;
