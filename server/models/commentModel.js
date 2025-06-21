// models/commentModel.js
const db = require('../config/db')

// create a new comment
exports.create = (postId, userId, content, cb) => {
  const sql = `
    INSERT INTO comments (post_id, user_id, content)
    VALUES (?, ?, ?)
  `
  db.query(sql, [postId, userId, content], cb)
}

// get comments for a post, paginated
exports.findByPostIdPaginated = (postId, limit, offset, cb) => {
  const sql = `
    SELECT 
      c.id, c.content, c.created_at,
      u.id   AS user_id,
      u.username,
      u.profile_image_url
    FROM comments c
    JOIN users u ON u.id = c.user_id
    WHERE c.post_id = ?
    ORDER BY c.created_at ASC
    LIMIT ? OFFSET ?
  `
  db.query(sql, [postId, limit, offset], cb)
}

exports.countByPost = (postId, cb) => {
  const sql = 'SELECT COUNT(*) AS count FROM comments WHERE post_id = ?'
  db.query(sql, [postId], (err, results) => {
    if (err) return cb(err)
    cb(null, results[0].count)
  })
}
