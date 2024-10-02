const { hash, compare } = require('bcrypt')
const { sign } = require('jsonwebtoken')
const User = require('../models/userModel')
const Candidate = require('../models/candidateModel')
const Recruiter = require('../models/recruiterModel')
const Admin = require('../models/adminModel')

const userControllers = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find()
      res.json(users)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  updatePassword: async (req, res) => {
    const { id } = req.params // id là _id
    const { oldPassword, newPassword } = req.body

    try {
      const user = await User.findById(id)
      console.log('User:', user)
      console.log('User Password:', user ? user.password : 'User not found')
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const isMatch = await compare(oldPassword, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: 'Old password is incorrect' })
      }

      const hashedNewPassword = await hash(newPassword, 10)

      user.password = hashedNewPassword
      await user.save()

      res.json({ message: 'Password updated successfully' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  deleteUser: async (req, res) => {
    const { id } = req.params
    try {
      await User.findOneAndDelete(id)
      await Admin.findOneAndDelete(id)
      await Recruiter.findOneAndDelete(id)

      res.json({ message: 'User deleted successfully' })
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },
  signUp: async (req, res) => {
    const { email, name, password, role } = req.body

    try {
      const hashedPassword = await hash(password, 10)

      const newUser = new User({ email, name, password: hashedPassword, role })

      const savedUser = await newUser.save()
      if (savedUser.role === 'candidate') {
        const newCandidate = new Candidate({
          id: savedUser._id.toString(),
          basic_info: { name, email }
        })

        const savedCandidate = await newCandidate.save()
        res.status(201).json(savedCandidate)
      } else if (savedUser.role === 'recruiter') {
        const newRecruiter = new Recruiter({
          id: savedUser._id.toString(),
          basic_info: { name, email }
        })

        const savedRecruiter = await newRecruiter.save()
        res.status(201).json(savedRecruiter)
      } else if (savedUser.role === 'admin') {
        const newAdmin = new Admin({
          id: savedUser._id.toString(),
          basic_info: { name, email }
        })

        const savedAdmin = await newAdmin.save()
        res.status(201).json(savedAdmin)
      } else {
        res.status(201).json(savedUser)
      }
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
        user
      }
      res.json(response)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }
}

module.exports = userControllers
