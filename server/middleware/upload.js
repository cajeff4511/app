// middleware/upload.js
const multer = require('multer')
const { storage } = require('../backend/cloudinary') // This pulls from your cloudinary.js

// This now uploads directly to Cloudinary
const upload = multer({ storage })

module.exports = upload
