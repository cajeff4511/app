const express = require('express');
const router  = express.Router();
const upload  = require('../middleware/upload');
const postCtrl = require('../controllers/postController');
const { authenticateToken } = require('../middleware/auth');

// GET   /api/posts/        → all posts
router.get('/',      authenticateToken, postCtrl.getAllPosts)

// GET   /api/posts/mine    → your posts
router.get('/mine',  authenticateToken, postCtrl.getUserPosts)

// GET   /api/posts/user/:id → someone’s posts
router.get('/user/:id', postCtrl.getPostsByUserId);

// POST  /api/posts/        → create new
router.post(
  '/',
  upload.single('image'),
  postCtrl.createPost
);

module.exports = router;
