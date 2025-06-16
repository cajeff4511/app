const express = require('express');
const router  = express.Router();
const upload  = require('../middleware/upload');
const {
  getAllUsers,
  getProfile,
  updateProfile,
  getUserById,
  searchUsers
} = require('../controllers/userController');

// GET   /api/users/        → list all users
router.get('/', getAllUsers);

// GET   /api/users/profile → your profile
router.get('/profile', getProfile);

// PUT   /api/users/profile → update bio & pic
router.put(
  '/profile',
  upload.single('profile_image'),
  updateProfile
);


 router.get('/search', searchUsers)
// GET   /api/users/:id     → someone else's profile
router.get('/:id', getUserById)



module.exports = router;
