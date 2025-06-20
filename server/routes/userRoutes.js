const express = require('express')
const router  = express.Router()
const upload  = require('../middleware/upload')
const {
  getAllUsers,
  getProfile,
  updateProfile,
  getUserById,
  searchUsers
} = require('../controllers/userController')

// List all users
router.get('/', getAllUsers)

// Your profile
router.get('/profile', getProfile)

// Update profile with bio + image
router.put(
  '/profile',
  upload.single('profile_image'),  // must match name from frontend form
  updateProfile
)

router.get('/search', searchUsers)

// Someone else's profile
router.get('/:id', getUserById)

module.exports = router
