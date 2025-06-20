// models/followerModel.js
const db = require('../config/db')

// follow
exports.create = (followerId, followedId, cb) => {
  const sql = 'INSERT INTO followers (follower_id, followed_id) VALUES (?, ?)'
  db.query(sql, [followerId, followedId], cb)
}

// unfollow
exports.delete = (followerId, followedId, cb) => {
  const sql = 'DELETE FROM followers WHERE follower_id = ? AND followed_id = ?'
  db.query(sql, [followerId, followedId], cb)
}

// count followers of a user
exports.countFollowers = (userId, cb) => {
  const sql = 'SELECT COUNT(*) AS count FROM followers WHERE followed_id = ?'
  db.query(sql, [userId], (err, results) => {
    if (err) return cb(err)
    cb(null, results[0].count)
  })
}

// count how many someone is following
exports.countFollowing = (userId, cb) => {
  const sql = 'SELECT COUNT(*) AS count FROM followers WHERE follower_id = ?'
  db.query(sql, [userId], (err, results) => {
    if (err) return cb(err)
    cb(null, results[0].count)
  })
}

// check if followerId is following followedId
exports.findOne = (followerId, followedId, cb) => {
  const sql = 'SELECT * FROM followers WHERE follower_id = ? AND followed_id = ?'
  db.query(sql, [followerId, followedId], cb)
}

// Get users that the logged-in user is following
exports.getFollowing = (userId, cb) => {
  const sql = `
    SELECT u.id, u.username, u.profile_image_url, u.bio
    FROM followers f
    JOIN users u ON f.followed_id = u.id
    WHERE f.follower_id = ?
  `;
  db.query(sql, [userId], cb);
};
