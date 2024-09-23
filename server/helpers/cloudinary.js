const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
    cloud_name: "dmtc7i9ve",
    api_key: "172247861112851",
    api_secret: "trVIOIvR_zegk02mKATfQWzc3Gg"
});

const storage = new multer.memoryStorage();

async function fileUpload(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto"
    });
    return result;
}

const upload = multer({storage});

module.exports = {upload, fileUpload};