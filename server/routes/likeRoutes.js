// routes/likeRoutes.js
const express = require('express')
const router  = express.Router()
const { authenticateToken }        = require('../middleware/auth')
const { getLikes, likePost, unlikePost } = require('../controllers/likeController')

router.use(authenticateToken)

router.get('/post/:postId',    getLikes)
router.post('/post/:postId',   likePost)
router.delete('/post/:postId', unlikePost)

module.exports = router
