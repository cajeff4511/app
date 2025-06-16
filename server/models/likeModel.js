// models/likeModel.js
const db = require('../config/db')

exports.create = (postId, userId, cb) => {
  const sql = 'INSERT INTO likes (post_id, user_id) VALUES (?, ?)'
  db.query(sql, [postId, userId], cb)
}

exports.delete = (postId, userId, cb) => {
  const sql = 'DELETE FROM likes WHERE post_id = ? AND user_id = ?'
  db.query(sql, [postId, userId], cb)
}

exports.countByPost = (postId, cb) => {
  const sql = 'SELECT COUNT(*) AS count FROM likes WHERE post_id = ?'
  db.query(sql, [postId], (err, results) => {
    if (err) return cb(err)
    cb(null, results[0].count)
  })
}

exports.findOne = (postId, userId, cb) => {
  const sql = 'SELECT * FROM likes WHERE post_id = ? AND user_id = ?'
  db.query(sql, [postId, userId], cb)
}
