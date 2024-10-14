const Product = require("../../models/Product");
const Order = require("../../models/Order");
const Review = require("../../models/Review");

const addReview = async (req, res) => {
    try {
        const { productId, userId, rating, comment } = req.body;

        const order = await Order.findOne({
            userId,
            "cartItems.productId": productId,
            orderStatus: "completed"
        });

        if (!order) {
            return res.status(403).json({
                success: false,
                message: "To write a review, you must first purchase the product."
            });
        }

        const isReviewExisted = await Review.findOne({ productId, userId });

        if (isReviewExisted) {
            return res.status(400).json({
                success: false,
                message: "You already reviewed this product."
            });
        }

        const newReview = new Review({ productId, userId, rating, comment });
        await newReview.save();

        const reviews = await Review.find({ productId });
        const ratingAverage = (reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length).toFixed(1);

        await Product.findByIdAndUpdate(productId, { ratingAverage });

        res.status(200).json({
            success: true,
            data: newReview
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured!"
        });
    }
}

const getReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await Review.find({ productId }).populate('userId', 'userName');

        res.status(200).json({
            success: true,
            data: reviews
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured!"
        });
    }
}

module.exports = { addReview, getReviews };