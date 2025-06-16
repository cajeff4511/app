// models/userModel.js
const db = require('../config/db')  // your mysql pool/connection

// find by email (for register/login)
exports.findByEmail = (email, cb) => {
  const sql = 'SELECT * FROM users WHERE email = ?'
  db.query(sql, [email], cb)
}

// create a new user
exports.create = (username, email, password_hash, cb) => {
  const sql = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)'
  db.query(sql, [username, email, password_hash], cb)
}

// list all users
exports.findAll = cb => {
  const sql = 'SELECT * FROM users'
  db.query(sql, cb)
}

// *** add this ***
exports.findById = (id, cb) => {
  const sql = 'SELECT * FROM users WHERE id = ?'
  db.query(sql, [id], cb)
}

// *** add this ***
exports.updateById = (id, fields, cb) => {
  // build "col = ?" sets
  const sets = Object.keys(fields)
    .map(col => `\`${col}\` = ?`)
    .join(', ')
  const values = Object.values(fields)

  const sql = `UPDATE users SET ${sets} WHERE id = ?`
  // push the id onto the params array
  db.query(sql, [...values, id], cb)
}

exports.searchByUsername = (q, cb) => {
  const sql = `
    SELECT id, username, profile_image_url
    FROM users
    WHERE username LIKE ?
    ORDER BY username
  `
  db.query(sql, [`%${q}%`], cb)
}

