const bcrypt = require('bcryptjs')
const jwt    = require('jsonwebtoken')
const User   = require('../models/userModel')

const JWT_SECRET = process.env.JWT_SECRET || 'yourJWTSecretKey'

exports.register = async (req, res) => {
  const { username, email, password } = req.body

  User.findByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' })
    if (results.length > 0) {
      return res.status(400).json({ message: 'Email already in use' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    User.create(username, email, hashedPassword, err => {
      if (err) return res.status(500).json({ message: 'Failed to register user' })
      res.status(201).json({ message: 'User registered successfully' })
    })
  })
}

exports.login = (req, res) => {
  const { email, password } = req.body

  User.findByEmail(email, async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const user = results[0]
    const isMatch = await bcrypt.compare(password, user.password_hash)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const payload = { id: user.id, username: user.username }
    const token   = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })

    res.json({ message: 'Login successful', token, user: payload })
  })
}
