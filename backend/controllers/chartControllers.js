const User = require('../models/userModel')
const Post = require('../models/postModel')

const chartControllers = {
  getUserCount: async (req, res) => {
    try {
      const userCount = await User.countDocuments()
      res.json(userCount)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },

  getPostCount: async (req, res) => {
    try {
      const postCount = await Post.countDocuments()
      res.json(postCount)
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
