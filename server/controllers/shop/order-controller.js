const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");
const paypal = require("../../helpers/paypal");

const createOrder = async (req, res) => {
    try {
        const { userId, cartId, cartItems, addressInfo, totalAmount, paymentId, payerId, paymentMethod, paymentStatus, orderStatus } = req.body;

        const create_payment_json = {
            intent: "sale",
            payer: {
                payment_method: "paypal"
            },
            redirect_urls: {
                return_url: process.env.CLIENT_BASE_URL + process.env.PAYPAL_RETURN_PATH,
                cancel_url: process.env.CLIENT_BASE_URL + process.env.PAYPAL_CANCEL_PATH
            },
            transactions: [
                {
                    item_list: {
                        items: cartItems.map(item => ({
                            name: item.title,
                            sku: item.productId,
                            price: item.price.toFixed(2),
                            currency: process.env.PAYPAL_CURRENCY,
                            quantity: item.quantity
                        }))
                    },
                    amount: {
                        currency: process.env.PAYPAL_CURRENCY,
                        total: totalAmount.toFixed(2)
                    },
                    description: "Payment description..."
                }
            ]
        }

        paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: "Error while creating paypal payment!"
                });
            } else {
                const newOrder = new Order({ userId, cartId, cartItems, addressInfo, totalAmount, paymentId, payerId, paymentMethod, paymentStatus, orderStatus });
                await newOrder.save();

                const approvalUrl = paymentInfo.links.find(link => link.rel === "approval_url").href;

                res.status(201).json({
                    success: true,
                    approvalUrl,
                    orderId: newOrder._id
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured!"
        });
    }
}

const capturePayment = async (req, res) => {
    try {
        const { orderId, paymentId, payerId } = req.body;
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order cannot be found!"
            });
        }

        for (let item of order.cartItems) {
            let product = await Product.findById(item.productId);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product/stock cannot be found!"
                });
            }

            product.totalStock -= item.quantity;
            await product.save();
        }

        const cartId = order.cartId;
        await Cart.findByIdAndDelete(cartId);

        order.paymentId = paymentId;
        order.payerId = payerId;
        order.paymentStatus = "paid";
        order.orderStatus = "inProgress";
        await order.save();

        res.status(201).json({
            success: true,
            message: "Order confirmed!",
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
        const { userId } = req.params;
        const orders = await Order.find({ userId });

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
        const { userId, orderId } = req.params;
        const order = await Order.findOne({ userId, _id: orderId });

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

module.exports = { createOrder, capturePayment, getOrders, getOrderDetails };