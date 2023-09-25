const CryptoJS = require("crypto-js");
const { Order } = require("../../../../models");

const { SECRET_KEY } = process.env;
const { urls } = require("../../../../config/app");

const secretKey = SECRET_KEY;

// Generate a secure download URL for an order
const generateLinkForExportExcel = async (req, res) => {
    try {
        const { orderId: id } = req.params;

        const existingOrder = await Order.findById(id);
        if (!existingOrder) {
            throw HttpError(432, "Список не знайдений");
        }

        const encryptedOrderId = encryptOrderId(id);

        const downloadUrl = `${
            urls.APP_URL
        }api/v1/export-order/${encodeURIComponent(encryptedOrderId)}`;
        console.log(downloadUrl);

        res.json({ downloadUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Помилка на боці сервера" });
    }
};

function encryptOrderId(orderId) {
    const result = CryptoJS.AES.encrypt(orderId, secretKey).toString();
    return result;
}

module.exports = generateLinkForExportExcel;
