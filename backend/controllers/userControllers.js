const { hash, compare } = require('bcrypt')
const { sign } = require('jsonwebtoken')

const {
  find,
  findById,
  findByIdAndDelete,
  findOne
} = require('../models/userModels')
const User = require('../models/userModels')

const userControllers = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find()
      res.json(users)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },

  updateUserPassword: async (req, res) => {
    const { id, currentPassword, newPassword } = req.body

    try {
      const user = await User.findById(id)
      if (!user) {
        return res.status(400).json({
          message: 'User not found'
        })
      }

      const validPassword = await compare(currentPassword, user.password)
      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid current password' })
      }

      const hashedPassword = await hash(newPassword, 10)
      user.password = hashedPassword
      await user.save()

      res.json({ message: 'Password changed successfully' })
    } catch (err) {
      res.status(400).json({
        message: err.message
      })
    }
  },

  deleteUser: async (req, res) => {
    try {
      await findByIdAndDelete(req.params.id)
      res.json({ message: 'User deleted successfully' })
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },

  signUp: async (req, res) => {
    const { email, password, role } = req.body

    try {
      const hashedPassword = await hash(password, 10)
      const newUser = new User({ email, password: hashedPassword, role })
      const savedUser = await newUser.save()
      res.status(201).json(savedUser)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },

  signIn: async (req, res) => {
    const { email, password } = req.body

    try {
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' })
      }

      const validPassword = await compare(password, user.password)
      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid email or password' })
      }

      const token = sign({ userId: user._id }, 'your_secret_key')

      const response = {
        token,
        user: {
          email: user.email,
          password: user.password,
          role: user.role
        }
      }
      res.json(response)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },
  logOut: async (req, res) => {
    try {
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1]

      if (!token) {
        return res.status(401).json({
          message: 'Unauthorized'
        })
      }
      await blacklistedTokens.create({ token })
      res.status(200).json({ message: 'Logged out successfully' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}

module.exports = userControllers
