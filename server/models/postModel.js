// models/postModel.js
const db = require('../config/db')

exports.create = (userId, content, imageUrl, cb) => {
  const sql = 'INSERT INTO posts (user_id, content, image_url) VALUES (?, ?, ?)'
  db.query(sql, [userId, content, imageUrl], cb)
}

exports.findAllPaginated = (limit, offset, cb) => {
  const sql = `
    SELECT 
      p.id, p.content, p.image_url, p.created_at,
      u.id    AS user_id,
      u.username, u.profile_image_url
    FROM posts p
    JOIN users u ON u.id = p.user_id
    ORDER BY p.created_at DESC
    LIMIT ? OFFSET ?
  `
  db.query(sql, [limit, offset], cb)
}

exports.findByUserIdPaginated = (userId, limit, offset, cb) => {
  const sql = `
    SELECT id, content, image_url, created_at
    FROM posts
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `
  db.query(sql, [userId, limit, offset], cb)
}
