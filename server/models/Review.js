const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    hidden: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;