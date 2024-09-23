const Product = require("../../models/Product");

const getProducts = async (req, res) => {
    try {
        const {category = [], brand = [], sortBy} = req.query;
        
        let filters = {};
        
        if (category.length) {
            filters.category = {$in: category.split(",")}
        }
        
        if (brand.length) {
            filters.brand = {$in: brand.split(",")}
        }
        
        let sort = {};

        switch (sortBy) {
            case "price-lowtohigh":
                sort.price = 1
                break;

            case "price-hightolow":
                sort.price = -1
                break;

            case "title-atoz":
                sort.title = 1
                break;

            case "title-ztoa":
                sort.title = -1
                break;
        
            default:
                sort.price = 1
                break;
        }

        const products = await Product.find(filters).sort(sort);
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

const getProduct = async (req, res) => {
    try {
        const {id} = req.params;

        const product = await Product.findById(id);

        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product not found!"
            });
        }

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

module.exports = {getProducts, getProduct};