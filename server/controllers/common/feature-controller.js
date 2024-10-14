const Feature = require('../../models/Feature');

const addFeatureImage = async (req, res) => {
    try {
        const { image } = req.body;
        const featureImage = new Feature({ image });
        await featureImage.save();

        res.status(201).json({
            success: true,
            data: featureImage
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured!"
        });
    }
}

const getFeatureImages = async (req, res) => {
    try {
        const featureImages = await Feature.find();

        res.status(200).json({
            success: true,
            data: featureImages
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured!"
        });
    }
}

const deleteFeatureImage = async (req, res) => {
    try {
        const {featureId} = req.params;
                
        const featureImage = await Feature.findByIdAndDelete(featureId);

        if (!featureImage) {
            return res.status(400).json({
                success: false,
                message: "Feature image not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Feature image deleted",
            data: featureImage
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured!"
        });
    }
}

module.exports = { addFeatureImage, getFeatureImages, deleteFeatureImage };