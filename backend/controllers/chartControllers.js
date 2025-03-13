const Admin = require('../models/adminModel')
const Recruiter = require('../models/recruiterModel')
const Candidate = require('../models/candidateModel')
const Post = require('../models/postModel')

const chartControllers = {
  getTotalUser: async (req, res) => {
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

  getUserByMonth: async (req, res) => {
    try {
      const now = new Date()
      const startMonth = new Date(now.getFullYear(), now.getMonth() - 5, 1)

      let time = []
      for (let i = 0; i < 6; i++) {
        let d = new Date(now.getFullYear(), now.getMonth() - i, 1)
        let formattedTime = `${('0' + (d.getMonth() + 1)).slice(
          -2
        )}-${d.getFullYear()}` // MM-YYYY
        time.push({
          time: formattedTime,
          month: d.getMonth() + 1,
          year: d.getFullYear()
        })
      }
      time = time.reverse()

      let result = time.map(({ time, month, year }) => ({
        time,
        month,
        year,
        admin: 0,
        candidate: 0,
        recruiter: 0,
        total: 0
      }))

      const aggregateRoleByMonth = async (Model) => {
        return Model.aggregate([
          { $match: { createdAt: { $gte: startMonth } } },
          {
            $project: {
              month: { $dateToString: { format: '%m-%Y', date: '$createdAt' } } // MM-YYYY
            }
          },
          {
            $group: {
              _id: '$month',
              count: { $sum: 1 }
            }
          }
        ])
      }

      const [adminData, candidateData, recruiterData] = await Promise.all([
        aggregateRoleByMonth(Admin),
        aggregateRoleByMonth(Candidate),
        aggregateRoleByMonth(Recruiter)
      ])

      const mergeData = (data, role) => {
        data.forEach((item) => {
          const monthIndex = result.findIndex((r) => r.time === item._id)
          if (monthIndex !== -1) {
            result[monthIndex][role] = item.count
          }
        })
      }

      mergeData(adminData, 'admin')
      mergeData(candidateData, 'candidate')
      mergeData(recruiterData, 'recruiter')

      result.forEach((item) => {
        item.total = item.admin + item.candidate + item.recruiter
      })

      res.json(result)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },

  getTotalPost: async (req, res) => {
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

      const statusCounts = { posted: 0, confirmed: 0, expired: 0, cancelled: 0 }
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

  getPostByMonth: async (req, res) => {
    try {
      const now = new Date()
      const startMonth = new Date(now.getFullYear(), now.getMonth() - 5, 1)

      let time = []
      for (let i = 0; i < 6; i++) {
        let d = new Date(now.getFullYear(), now.getMonth() - i, 1)
        let formattedTime = `${('0' + (d.getMonth() + 1)).slice(
          -2
        )}-${d.getFullYear()}` // MM-YYYY
        time.push({
          time: formattedTime,
          month: d.getMonth() + 1,
          year: d.getFullYear()
        })
      }
      time = time.reverse()

      const result = time.map(({ time, month, year }) => ({
        time,
        month,
        year,
        posted: 0,
        confirmed: 0,
        expired: 0,
        cancelled: 0,
        total: 0
      }))

      const data = await Post.aggregate([
        {
          $match: {
            createdAt: { $gte: startMonth },
            status: { $in: ['posted', 'confirmed', 'expired', 'cancelled'] }
          }
        },
        {
          $project: {
            time: { $dateToString: { format: '%m-%Y', date: '$createdAt' } }, // MM-YYYY
            status: 1
          }
        },
        {
          $group: {
            _id: { time: '$time', status: '$status' },
            count: { $sum: 1 }
          }
        }
      ])

      data.forEach((item) => {
        const monthKey = item._id.time
        const monthObj = result.find((r) => r.time === monthKey)

        if (monthObj) {
          monthObj[item._id.status] = item.count
        }
      })

      result.forEach((item) => {
        item.total =
          item.posted + item.confirmed + item.expired + item.cancelled
      })

      res.json(result)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  getTotalApplication: async (req, res) => {
    try {
      const result = await Post.aggregate([
        {
          $project: {
            appliedCount: { $size: { $ifNull: ['$applied', []] } },
            approvedCount: { $size: { $ifNull: ['$approved', []] } }
          }
        },
        {
          $group: {
            _id: null,
            totalApplied: { $sum: '$appliedCount' },
            totalApproved: { $sum: '$approvedCount' }
          }
        }
      ])

      const totals = result[0] || { totalApplied: 0, totalApproved: 0 }
      const total = totals.totalApplied + totals.totalApproved

      res.json({
        applied: totals.totalApplied,
        approved: totals.totalApproved,
        total
      })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },

  getApplicationByMonth: async (req, res) => {
    try {
      const now = new Date()
      const startMonth = new Date(now.getFullYear(), now.getMonth() - 5, 1)

      let time = []
      for (let i = 0; i < 6; i++) {
        let d = new Date(now.getFullYear(), now.getMonth() - i, 1)
        let formattedTime = `${('0' + (d.getMonth() + 1)).slice(
          -2
        )}-${d.getFullYear()}` // MM-YYYY
        time.push({
          time: formattedTime,
          month: d.getMonth() + 1,
          year: d.getFullYear()
        })
      }
      time = time.reverse()

      const result = time.map(({ time, month, year }) => ({
        time,
        month,
        year,
        applied: 0,
        approved: 0,
        total: 0
      }))

      const data = await Post.aggregate([
        { $match: { createdAt: { $gte: startMonth } } },
        {
          $project: {
            time: { $dateToString: { format: '%m-%Y', date: '$createdAt' } }, // MM-YYYY
            appliedCount: { $size: { $ifNull: ['$applied', []] } },
            approvedCount: { $size: { $ifNull: ['$approved', []] } }
          }
        },
        {
          $group: {
            _id: '$time',
            totalApplied: { $sum: '$appliedCount' },
            totalApproved: { $sum: '$approvedCount' }
          }
        }
      ])

      data.forEach((item) => {
        const monthObj = result.find((r) => r.time === item._id)
        if (monthObj) {
          monthObj.applied = item.totalApplied
          monthObj.approved = item.totalApproved
          monthObj.total = item.totalApplied + item.totalApproved
        }
      })

      res.json(result)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },
  getRateUser: async (req, res) => {
    try {
      const adminCount = await Admin.countDocuments()
      const candidateCount = await Candidate.countDocuments()
      const recruiterCount = await Recruiter.countDocuments()
      const total = adminCount + candidateCount + recruiterCount

      let adminRate = 0,
        candidateRate = 0,
        recruiterRate = 0
      if (total > 0) {
        adminRate = ((adminCount / total) * 100).toFixed(2)
        candidateRate = ((candidateCount / total) * 100).toFixed(2)
        recruiterRate = ((recruiterCount / total) * 100).toFixed(2)
      }
      res.json({
        adminRate: adminRate + '%',
        candidateRate: candidateRate + '%',
        recruiterRate: recruiterRate + '%'
      })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },

  getRatePost: async (req, res) => {
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

      const counts = { posted: 0, confirmed: 0, expired: 0, cancelled: 0 }
      results.forEach((item) => {
        counts[item._id] = item.count
      })
      const total =
        counts.posted + counts.confirmed + counts.expired + counts.cancelled

      let postedRate = 0,
        confirmedRate = 0,
        expiredRate = 0,
        cancelledRate = 0
      if (total > 0) {
        postedRate = ((counts.posted / total) * 100).toFixed(2)
        confirmedRate = ((counts.confirmed / total) * 100).toFixed(2)
        expiredRate = ((counts.expired / total) * 100).toFixed(2)
        cancelledRate = ((counts.cancelled / total) * 100).toFixed(2)
      }
      res.json({
        postedRate: postedRate + '%',
        confirmedRate: confirmedRate + '%',
        expiredRate: expiredRate + '%',
        cancelledRate: cancelledRate + '%'
      })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },

  getRateApply: async (req, res) => {
    try {
      const result = await Post.aggregate([
        {
          $project: {
            appliedCount: { $size: { $ifNull: ['$applied', []] } },
            approvedCount: { $size: { $ifNull: ['$approved', []] } }
          }
        },
        {
          $group: {
            _id: null,
            totalApplied: { $sum: '$appliedCount' },
            totalApproved: { $sum: '$approvedCount' }
          }
        }
      ])

      const totals = result[0] || { totalApplied: 0, totalApproved: 0 }
      const total = totals.totalApplied + totals.totalApproved
      let applyRate = 0
      if (total > 0) {
        applyRate = ((totals.totalApplied / total) * 100).toFixed(2)
      }
      res.json({ applyRate: applyRate + '%' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

module.exports = chartControllers
