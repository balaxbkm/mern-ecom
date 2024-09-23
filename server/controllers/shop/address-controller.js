const Address = require("../../models/Address");

const addAddress = async (req, res) => {
    try {
        const { userId, address, city, pincode, phone, notes } = req.body;

        if (!userId || !address || !city || !pincode || !phone) {
            res.status(400).json({
                success: false,
                message: "Invalid inputs!"
            });
        }

        const newAddress = new Address({ userId, address, city, pincode, phone, notes });
        await newAddress.save();

        res.status(201).json({
            success: true,
            message: "Address added!",
            data: newAddress
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured!"
        });
    }
}

const fetchAllAddresses = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            res.status(400).json({
                success: false,
                message: "Invalid user!"
            });
        }

        const addresss = await Address.find({ userId });

        res.status(200).json({
            success: true,
            data: addresss
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured!"
        });
    }
}

const updateAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const formData = req.body;

        if (!userId || !addressId) {
            res.status(400).json({
                success: false,
                message: "Required User and Address Id's"
            });
        }

        const address = await Address.findOneAndUpdate({
            _id: addressId,
            userId
        }, formData, { new: true });

        if (!address) {
            res.status(404).json({
                success: false,
                message: "Address not found!"
            });
        }

        res.status(200).json({
            success: true,
            message: "Address updated!",
            data: address
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured!"
        });
    }
}

const deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const address = await Address.findOneAndDelete({
            _id: addressId,
            userId
        });

        if (!address) {
            res.status(404).json({
                success: false,
                message: "Address not found!"
            });
        }

        res.status(200).json({
            success: true,
            message: "Address deleted!"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occured!"
        });
    }
}

module.exports = { addAddress, fetchAllAddresses, updateAddress, deleteAddress };