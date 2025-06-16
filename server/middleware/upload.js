const multer  = require('multer')
const path    = require('path')

// store in ./uploads, keep original extension
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename:    (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `user-${req.user.id}${Date.now()}${ext}`)
  }
})

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Invalid file type'), false)
  }
  cb(null, true)
}

module.exports = multer({ storage, fileFilter })
