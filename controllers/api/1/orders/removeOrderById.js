const { Order } = require("../../../../models");
const { HttpError } = require("../../../../utils/helpers");

const removeOrderById = async (req, res) => {
    const { orderId } = req.params;
    const existingOrder = await Order.findById(orderId);

    if (!existingOrder) {
        throw HttpError(432, "Список не знайдено");
    }

    const result = await Order.findByIdAndDelete(orderId);
    if (!result) {
        throw HttpError(432, "Список не знайдено");
    }

    res.json({
        message: "Список успішно видалено",
    });
};
module.exports = removeOrderById;
