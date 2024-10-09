const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: String,
    cartId: String,
    cartItems: [
        {
            productId: String,
            title: String,
            image: String,
            price: String,
            quantity: Number
        }
    ],
    addressInfo: {
        addressId: String,
        address: String,
        city: String,
        pincode: String,
        phone: String,
        notes: String
    },
    totalAmount: Number,
    paymentId: String,
    payerId: String,
    paymentMethod: String,
    paymentStatus: String,
    orderStatus: String
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;