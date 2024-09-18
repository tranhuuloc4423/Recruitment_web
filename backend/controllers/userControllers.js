const { hash, compare } = require('bcrypt')
const { sign } = require('jsonwebtoken')
const { find, findByIdAndUpdate, findByIdAndDelete, findOne } =
  '../models/UserModels'
const User = require('../models/userModels')

const userControllers = {
  getAllUsers: async (req, res) => {
    try {
      const users = await find()
      res.json(users)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },

  updateUser: async (req, res) => {
    try {
      await findByIdAndUpdate(req.params.id, req.body)
      res.json({ message: 'User updated successfully' })
    } catch (err) {
      res.status(400).json({ message: err.message })
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
      const user = await findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' })
      }

      const validPassword = await compare(password, user.password)
      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid email or password' })
      }

      const token = sign({ userId: user._id }, 'your_secret_key')
      res.json({ token })
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }
}

module.exports = userControllers
