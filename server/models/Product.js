const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    image: {
        type: String
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    brand: {
        type: String
    },
    price: {
        type: Number
    },
    salePrice: {
        type: Number
    },
    totalStock: {
        type: Number
    }
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;