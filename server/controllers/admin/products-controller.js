const { fileUpload } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await fileUpload(url);
        res.json({
            success: true,
            result
        });
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured!"
        });
    }
}

const addProduct = async (req, res) => {
    try {
        const {image, title, description, category, brand, price, salePrice, totalStock} = req.body;
        const newProduct = new Product({image, title, description, category, brand, price, salePrice, totalStock});
        await newProduct.save();

        res.status(201).json({
            success: true,
            message: "Product added!",
            data: newProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured!"
        });
    }
}

const fetchAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});

        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured!"
        });
    }
}

const fetchProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);

        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured!"
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const {image, title, description, category, brand, price, salePrice, totalStock} = req.body;
        const product = await Product.findById(id);

        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product not found!"
            });
        }

        product.image = image || product.image;
        product.title = title || product.title;
        product.description = description || product.description;
        product.category = category || product.category;
        product.brand = brand || product.brand;
        product.price = price === "" ? 0 : price || product.price;
        product.salePrice = salePrice === "" ? 0 : salePrice || product.salePrice;
        product.totalStock = totalStock === "" ? 0 : totalStock || product.totalStock;
        await product.save();

        res.status(200).json({
            success: true,
            message: "Product updated!",
            data: product
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured!"
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product not found!"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted!"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured!"
        });
    }
}

module.exports = {handleImageUpload, addProduct, fetchAllProducts, fetchProduct, updateProduct, deleteProduct};