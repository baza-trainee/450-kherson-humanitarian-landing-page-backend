const { v4: uuidv4 } = require("uuid");
const { Order, Token } = require("../../../../models");

const { urls } = require("../../../../config/app");

// Generate a secure download URL for an order
const generateLinkForExportExcel = async (req, res) => {
    try {
        const { orderId } = req.params;

        const existingOrder = await Order.findById(orderId);
        if (!existingOrder) {
            throw HttpError(432, "Список не знайдений");
        }

        // Generate a unique token
        const token = uuidv4();

        // Store the mapping between the token and the order ID in the database
        await Token.create({ token, orderId });

        const downloadUrl = `${urls.APP_URL}/api/v1/export-order/${token}`;
        console.log(downloadUrl);

        res.json({ downloadUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Помилка на боці сервера" });
    }
};

module.exports = generateLinkForExportExcel;
