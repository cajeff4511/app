const User = require('../models/userModel')

// list everyone (for admin or listing)
exports.getAllUsers = (req, res) => {
  User.findAll((err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch users' })
    res.json(results)
  })
}

// view your own profile
exports.getProfile = (req, res) => {
  User.findById(req.user.id, (err, results) => {
    if (err || !results.length) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(results[0])
  })
}

// update bio and/or profile picture
exports.updateProfile = (req, res) => {
  const updates = {}
  if (req.body.bio != null) {
    updates.bio = req.body.bio
  }
  if (req.file) {
    updates.profile_image_url = `/uploads/${req.file.filename}`
  }

  User.updateById(req.user.id, updates, err => {
    if (err) return res.status(500).json({ message: 'Update failed' })

    // return fresh record
    User.findById(req.user.id, (err2, results) => {
      if (err2) return res.status(500).json({ message: 'Fetch failed' })
      res.json(results[0])
    })
  })
}


exports.getUserById = (req, res) => {
  const id = req.params.id
  User.findById(id, (err, results) => {
    if (err || !results.length) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(results[0])
  })
}

exports.searchUsers = (req, res) => {
  const q = req.query.q || ''
  User.searchByUsername(q, (err, results) => {
    if (err) return res.status(500).json({ message: 'Search failed' })
    res.json(results)
  })
}