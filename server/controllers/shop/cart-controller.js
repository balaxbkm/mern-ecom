const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const addToCart = async (req, res) => {
    try {
        const {userId, productId, quantity} = req.body;

        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!"
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found!"
            });
        }

        if (product.totalStock < quantity) {
            return res.status(400).json({
                success: false,
                message: "Quantity exeeded the available stock!"
            });
        }

        let cart = await Cart.findOne({userId});

        if (!cart) {
            cart = new Cart({userId, items: []});
        }

        const currentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (currentProductIndex === -1) {
            cart.items.push({productId, quantity});
        } else {
            cart.items[currentProductIndex].quantity += quantity;
        }

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Product added to the cart!",
            data: cart
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured!"
        });
    }
}

const getCartItems = async (req, res) => {
    try {
        const {userId} = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User id is required!"
            });
        }

        const cart = await Cart.findOne({userId}).populate({
            path: "items.productId",
            select: "image title price salePrice totalStock"
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart is empty!"
            });
        }

        const validItems = cart.items.filter(item => item.productId);

        if (validItems.length < cart.items.length) {
            cart.items = validItems;
            await cart.save();
        }

        const populateCartItems = validItems.map(item => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            totalStock: item.productId.totalStock,
            quantity: item.quantity
        }));

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
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

const updateCart = async (req, res) => {
    try {
        const {userId, productId, quantity} = req.body;

        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!"
            });
        }

        const cart = await Cart.findOne({userId});

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart is empty!"
            });
        }

        const currentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if (currentProductIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found!"
            });
        }

        cart.items[currentProductIndex].quantity = quantity;
        await cart.save();

        await cart.populate({
            path: "items.productId",
            select: "image title price salePrice totalStock"
        });

        const populateCartItems = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            totalStock: item.productId ? item.productId.totalStock : null,
            quantity: item.quantity
        }));

        res.status(200).json({
            success: true,
            message: "Cart updated!",
            data: {
                ...cart._doc,
                items: populateCartItems
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

const deleteCartItem = async (req, res) => {
    try {
        const {userId, productId} = req.params;

        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "Invalid data provided!"
            });
        }

        const cart = await Cart.findOne({userId}).populate({
            path: "items.productId",
            select: "image title price salePrice totalStock"
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart is empty!"
            });
        }

        cart.items = cart.items.filter(item => item.productId._id.toString() !== productId);
        await cart.save();
        await cart.populate({
            path: "items.productId",
            select: "image title price salePrice totalStock"
        });

        const populateCartItems = cart.items.map(item => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : "Product not found",
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            totalStock: item.productId ? item.productId.totalStock : null,
            quantity: item.quantity
        }));

        res.status(200).json({
            success: true,
            message: "Cart item deleted!",
            data: {
                ...cart._doc,
                items: populateCartItems
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

module.exports = {addToCart, updateCart, getCartItems, deleteCartItem};