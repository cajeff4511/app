// routes/commentRoutes.js
const express = require('express')
const router  = express.Router()
const { authenticateToken }     = require('../middleware/auth')
const { getCommentsByPost, createComment, getCountByPost } = require('../controllers/commentController')

// all routes require auth
router.use(authenticateToken)

// GET    /api/comments/post/:postId
router.get('/post/:postId', getCommentsByPost)

// POST   /api/comments/post/:postId
router.post('/post/:postId', createComment)

router.get('/post/:id/count', getCountByPost);

module.exports = router
