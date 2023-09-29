const { Schema, model } = require("mongoose");

const tokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true, // Ensures each token is unique
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order", // Reference to the Order model
        required: true,
    },
});

const Token = model("token", tokenSchema);

module.exports = { Token };
