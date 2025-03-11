const User = require('../models/userModel')
const Admin = require('../models/adminModel')
const Recruiter = require('../models/recruiterModel')
const Candidate = require('../models/candidateModel')
const Post = require('../models/postModel')

const chartControllers = {
  getUserCount: async (req, res) => {
    try {
      const adminCount = await Admin.countDocuments()
      const candidateCount = await Candidate.countDocuments()
      const recruiterCount = await Recruiter.countDocuments()

      const total = adminCount + candidateCount + recruiterCount

      res.json({
        admin: adminCount,
        candidate: candidateCount,
        recruiter: recruiterCount,
        total
      })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },

  getPostCount: async (req, res) => {
    try {
      const results = await Post.aggregate([
        {
          $match: {
            status: { $in: ['posted', 'confirmed', 'expired', 'cancelled'] }
          }
        },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ])

      const statusCounts = {
        posted: 0,
        confirmed: 0,
        expired: 0,
        cancelled: 0
      }

      results.forEach((item) => {
        statusCounts[item._id] = item.count
      })

      statusCounts.total =
        statusCounts.posted +
        statusCounts.confirmed +
        statusCounts.expired +
        statusCounts.cancelled

      res.json(statusCounts)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  getTotalApplicationCount: async (req, res) => {
    try {
      const result = await Post.aggregate([
        {
          $project: {
            totalApplications: {
              $add: [
                { $size: { $ifNull: ['$applied', []] } },
                { $size: { $ifNull: ['$approved', []] } }
              ]
            }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$totalApplications' }
          }
        }
      ])

      const totalApplications = result[0] ? result[0].total : 0
      res.json({ totalApplications })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  getUserCountCurrentMonth: async (req, res) => {
    try {
      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)

      const userCountCurrentMonth = await User.countDocuments({
        createdAt: { $gte: startOfMonth, $lt: endOfMonth }
      })

      res.json({ userCountCurrentMonth })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  getPostCountCurrentMonthConfirmed: async (req, res) => {
    try {
      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)

      const confirmedCount = await Post.countDocuments({
        status: 'confirmed',
        createdAt: { $gte: startOfMonth, $lt: endOfMonth }
      })

      res.json({ confirmedCount })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },

  getPostCountCurrentMonthCancelled: async (req, res) => {
    try {
      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)

      const cancelledCount = await Post.countDocuments({
        status: 'cancelled',
        createdAt: { $gte: startOfMonth, $lt: endOfMonth }
      })

      res.json({ cancelledCount })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

module.exports = chartControllers
