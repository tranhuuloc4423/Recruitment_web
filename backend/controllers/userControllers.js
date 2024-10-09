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
    const { id } = req.params
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

      let newCandidateData = {
        basic_info: {
          name,
          email,
          image: '',
          dob: '',
          phone: '',
          address: '',
          gender: ''
        },
        other_info: {
          desc: '',
          education: '',
          exps: '',
          skills: [],
          projects: '',
          certificates: ''
        }
      }
      let newRecruiterData = {
        basic_info: {
          name,
          email,
          image: '',
          field: '',
          tax_id: '',
          address: ''
        },
        other_info: {
          desc: '',
          speciality: [],
          types: [],
          wforms: [],
          images: []
        }
      }
      let newAdminData = {
        basic_info: {
          name,
          email,
          image: '',
          field: '',
          tax_id: '',
          address: ''
        },
        other_info: {
          desc: '',
          speciality: [],
          types: [],
          wforms: [],
          images: []
        }
      }

      if (savedUser.role === 'candidate') {
        newCandidateData.userId = savedUser._id
        const newCandidate = new Candidate(newCandidateData)
        const savedCandidate = await newCandidate.save()
        res.status(201).json(savedCandidate)
      } else if (savedUser.role === 'recruiter') {
        newRecruiterData.userId = savedUser._id
        const newRecruiter = new Recruiter(newRecruiterData)
        const savedRecruiter = await newRecruiter.save()
        res.status(201).json(savedRecruiter)
      } else if (savedUser.role === 'admin') {
        newAdminData.userId = savedUser._id
        const newAdmin = new Admin(newAdminData)
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
