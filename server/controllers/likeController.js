// controllers/likeController.js
const Like = require('../models/likeModel')

function sendSummary(postId, userId, res) {
  Like.countByPost(postId, (err, count) => {
    if (err) return res.status(500).json({ message: 'Error counting likes' })
    Like.findOne(postId, userId, (err2, rows) => {
      if (err2) return res.status(500).json({ message: 'Error checking like' })
      res.json({ count, liked: rows.length > 0 })
    })
  })
}

// GET  /api/likes/post/:postId
exports.getLikes = (req, res) => {
  const { postId } = req.params
  sendSummary(postId, req.user.id, res)
}

// POST /api/likes/post/:postId
exports.likePost = (req, res) => {
  const { postId } = req.params
  Like.create(postId, req.user.id, err => {
    if (err) return res.status(500).json({ message: 'Failed to like' })
    sendSummary(postId, req.user.id, res)
  })
}

// DELETE /api/likes/post/:postId
exports.unlikePost = (req, res) => {
  const { postId } = req.params
  Like.delete(postId, req.user.id, err => {
    if (err) return res.status(500).json({ message: 'Failed to unlike' })
    sendSummary(postId, req.user.id, res)
  })
}
