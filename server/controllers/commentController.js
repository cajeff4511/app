// controllers/commentController.js
const Comment = require('../models/commentModel')
const DEFAULT_LIMIT = 3

// GET /api/comments/post/:postId?limit=&offset=
exports.getCommentsByPost = (req, res) => {
  const postId = req.params.postId
  const limit  = Math.min(parseInt(req.query.limit)  || DEFAULT_LIMIT,  100)
  const offset = Math.max(parseInt(req.query.offset) || 0,              0)

  Comment.findByPostIdPaginated(postId, limit, offset, (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch comments' })
    res.json(results)
  })
}

// POST /api/comments/post/:postId
exports.createComment = (req, res) => {
  const postId  = req.params.postId
  const userId  = req.user.id
  const content = req.body.content || ''

  Comment.create(postId, userId, content, err => {
    if (err) return res.status(500).json({ message: 'Failed to add comment' })
    // return first page of comments after insert
    Comment.findByPostIdPaginated(postId, DEFAULT_LIMIT, 0, (e2, comments) => {
      if (e2) return res.status(500).json({ message: 'Fetch failed' })
      res.status(201).json(comments)
    })
  })
}
