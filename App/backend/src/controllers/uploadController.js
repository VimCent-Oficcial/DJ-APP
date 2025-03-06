const cloudinary = require('../config/cloudinary');

const uploadController = {
  uploadImage: async (req, res) => {
    try {
      const file = req.files.image; // Asume que el archivo se envía como 'image'
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      res.status(200).json({ url: result.secure_url });
    } catch (error) {
      res.status(500).json({ message: 'Error subiendo la imagen', error: error.message });
    }
  },
};

module.exports = uploadController;