const CryptoJS = require('crypto-js');
const { Order } = require('../../../../models');

const { SECRET_KEY } = process.env;

const secretKey = SECRET_KEY;

// Generate a secure download URL for an order
const generateLinkForExportExcel = async (req, res) => {
  try {
    const { orderId: id } = req.params;

    const existingOrder = await Order.findById(id);
    if (!existingOrder) {
      throw HttpError(404, 'Order not found');
    }

    const encryptedOrderId = encryptOrderId(id);

    const downloadUrl = `/export-order/${encodeURIComponent(encryptedOrderId)}`;
    console.log(downloadUrl);

    res.json({ downloadUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

function encryptOrderId(orderId) {
  const result = CryptoJS.AES.encrypt(orderId, secretKey).toString();
  return result;
}

module.exports = generateLinkForExportExcel;
