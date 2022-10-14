const cloudinary = require("cloudinary").v2;
const {cloudinaryName, cloudinaryApiKey, cloudinarySecret } = require('../config/config')

cloudinary.config({
    cloud_name: cloudinaryName,
    api_key: cloudinaryApiKey,
    api_secret: cloudinarySecret
});

module.exports = cloudinary;