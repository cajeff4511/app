// routes/followRoutes.js
const express = require('express')
const router  = express.Router()
const { authenticateToken } = require('../middleware/auth')
const {
  getFollowStatus,
  followUser,
  unfollowUser,
  getFollowing
} = require('../controllers/followController')

router.use(authenticateToken)

// get counts + whether I’m following :id
router.get('/user/:id/status', getFollowStatus)

// follow
router.post('/user/:id',   followUser)

// unfollow
router.delete('/user/:id', unfollowUser)

router.get('/following', authenticateToken, getFollowing);


module.exports = router
