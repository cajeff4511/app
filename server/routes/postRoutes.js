const express = require('express')
const router  = express.Router()
const upload  = require('../middleware/upload')
const postCtrl = require('../controllers/postController')
const { authenticateToken } = require('../middleware/auth')

// Get posts
router.get('/', authenticateToken, postCtrl.getAllPosts)
router.get('/mine', authenticateToken, postCtrl.getUserPosts)
router.get('/user/:id', postCtrl.getPostsByUserId)
router.get('/following', authenticateToken, postCtrl.getFollowingPosts)

// Create new post (with optional image)
router.post(
  '/',
  upload.single('image'),  // expects "image" field from frontend
  postCtrl.createPost
)

module.exports = router
