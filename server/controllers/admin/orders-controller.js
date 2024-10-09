const Order = require("../../models/Order");

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { orderStatus } = req.body;

        const order = await Order.findById(orderId);

        if (!order) {
            res.status(404).json({
                success: false,
                message: "Order not found!"
            });
        }

        order.orderStatus = orderStatus || order.orderStatus;
        await order.save();

        res.status(200).json({
            success: true,
            message: "Order status changed!",
            data: order
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured!"
        });
    }
}

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        if (!orders.length) {
            res.status(404).json({
                success: false,
                message: "No orders found!"
            });
        }

        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured!"
        });
    }
}

const getOrderDetails = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findOne({ _id: orderId });

        if (!order) {
            res.status(404).json({
                success: false,
                message: "Order not found!"
            });
        }

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured!"
        });
    }
}

module.exports = { updateOrderStatus, getOrders, getOrderDetails };