// controllers/followController.js
const Follow = require('../models/followerModel')

function sendStatus(targetUserId, meId, res) {
  Follow.countFollowers(targetUserId, (e1, followersCount) => {
    if (e1) return res.status(500).json({ message: 'Error counting followers' })
    Follow.countFollowing(targetUserId, (e2, followingCount) => {
      if (e2) return res.status(500).json({ message: 'Error counting following' })
      Follow.findOne(meId, targetUserId, (e3, rows) => {
        if (e3) return res.status(500).json({ message: 'Error checking follow' })
        res.json({
          followersCount,
          followingCount,
          isFollowing: rows.length > 0
        })
      })
    })
  })
}

// GET /api/follows/user/:id/status
exports.getFollowStatus = (req, res) => {
  const targetId = req.params.id
  const meId     = req.user.id
  sendStatus(targetId, meId, res)
}

// POST /api/follows/user/:id
exports.followUser = (req, res) => {
  const targetId = req.params.id
  const meId     = req.user.id
  Follow.create(meId, targetId, err => {
    if (err) return res.status(500).json({ message: 'Failed to follow' })
    sendStatus(targetId, meId, res)
  })
}

// DELETE /api/follows/user/:id
exports.unfollowUser = (req, res) => {
  const targetId = req.params.id
  const meId     = req.user.id
  Follow.delete(meId, targetId, err => {
    if (err) return res.status(500).json({ message: 'Failed to unfollow' })
    sendStatus(targetId, meId, res)
  })
}
