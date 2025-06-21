// controllers/postController.js
const Post = require('../models/postModel')
const DEFAULT_LIMIT = 5

// GET /api/posts?limit=…&offset=…
exports.getAllPosts = (req, res) => {
  const limit  = Math.min(parseInt(req.query.limit)  || DEFAULT_LIMIT,  100)
  const offset = Math.max(parseInt(req.query.offset) || 0,              0)
  Post.findAllPaginated(limit, offset, (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch posts' })
    res.json(results)
  })
}

// GET /api/posts/mine?limit=…&offset=…
exports.getUserPosts = (req, res) => {
  const limit  = Math.min(parseInt(req.query.limit)  || DEFAULT_LIMIT,  100)
  const offset = Math.max(parseInt(req.query.offset) || 0,              0)
  Post.findByUserIdPaginated(req.user.id, limit, offset, (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch your posts' })
    res.json(results)
  })
}

// POST /api/posts
exports.createPost = (req, res) => {
  const content  = req.body.content || ''
  const imageUrl = req.file ? `${req.file.filename}` : null

  Post.create(req.user.id, content, imageUrl, err => {
    if (err) return res.status(500).json({ message: 'Failed to create post' })

    // after creating, return the first page of posts
    Post.findAllPaginated(DEFAULT_LIMIT, 0, (e2, all) => {
      if (e2) return res.status(500).json({ message: 'Fetch failed' })
      res.status(201).json(all)
    })
  })
}

// GET /api/posts/user/:id
exports.getPostsByUserId = (req, res) => {
  const limit  = DEFAULT_LIMIT
  const offset = 0
  Post.findByUserIdPaginated(req.params.id, limit, offset, (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch posts' })
    res.json(results)
  })
}

exports.getFollowingPosts = (req, res) => {
  const limit  = Math.min(parseInt(req.query.limit) || DEFAULT_LIMIT, 100)
  const offset = Math.max(parseInt(req.query.offset) || 0, 0)

  Post.findFollowingPaginated(req.user.id, limit, offset, (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch following posts' })
    res.json(results)
  })
}
