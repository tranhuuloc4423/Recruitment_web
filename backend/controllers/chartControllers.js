const Admin = require('../models/adminModel')
const Recruiter = require('../models/recruiterModel')
const Candidate = require('../models/candidateModel')
const Post = require('../models/postModel')

const chartControllers = {
  getUser: async (req, res) => {
    try {
      // 1. Tổng số người dùng và tính rate tổng
      const adminCount = await Admin.countDocuments()
      const candidateCount = await Candidate.countDocuments()
      const recruiterCount = await Recruiter.countDocuments()
      const total = adminCount + candidateCount + recruiterCount
      const overallRate =
        total > 0
          ? {
              admin: ((adminCount / total) * 100).toFixed(2) + '%',
              candidate: ((candidateCount / total) * 100).toFixed(2) + '%',
              recruiter: ((recruiterCount / total) * 100).toFixed(2) + '%'
            }
          : { admin: '0%', candidate: '0%', recruiter: '0%' }

      // 2. Thống kê người dùng theo tháng (6 tháng gần đây)
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
      let monthlyData = time.map(({ time, month, year }) => ({
        time,
        month,
        year,
        admin: 0,
        candidate: 0,
        recruiter: 0,
        total: 0
      }))

      // Hàm tổng hợp số liệu theo tháng cho 1 model
      const aggregateRoleByMonth = async (Model) => {
        return Model.aggregate([
          { $match: { createdAt: { $gte: startMonth } } },
          {
            $project: {
              month: { $dateToString: { format: '%m-%Y', date: '$createdAt' } }
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
          const index = monthlyData.findIndex((r) => r.time === item._id)
          if (index !== -1) {
            monthlyData[index][role] = item.count
          }
        })
      }

      mergeData(adminData, 'admin')
      mergeData(candidateData, 'candidate')
      mergeData(recruiterData, 'recruiter')

      monthlyData.forEach((item) => {
        item.total = item.admin + item.candidate + item.recruiter
        if (item.total > 0) {
          item.rate = {
            admin: ((item.admin / item.total) * 100).toFixed(2) + '%',
            candidate: ((item.candidate / item.total) * 100).toFixed(2) + '%',
            recruiter: ((item.recruiter / item.total) * 100).toFixed(2) + '%'
          }
        } else {
          item.rate = { admin: '0%', candidate: '0%', recruiter: '0%' }
        }
      })

      res.json({
        totalUsers: {
          admin: adminCount,
          candidate: candidateCount,
          recruiter: recruiterCount,
          total,
          rate: overallRate
        },
        monthlyData
      })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },

  getPost: async (req, res) => {
    try {
      // 1. Tổng số bài đăng và tính rate tổng
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
      counts.total =
        counts.posted + counts.confirmed + counts.expired + counts.cancelled

      const overallRate =
        counts.total > 0
          ? {
              posted: ((counts.posted / counts.total) * 100).toFixed(2) + '%',
              confirmed:
                ((counts.confirmed / counts.total) * 100).toFixed(2) + '%',
              expired: ((counts.expired / counts.total) * 100).toFixed(2) + '%',
              cancelled:
                ((counts.cancelled / counts.total) * 100).toFixed(2) + '%'
            }
          : { posted: '0%', confirmed: '0%', expired: '0%', cancelled: '0%' }

      // 2. Thống kê bài đăng theo tháng (6 tháng gần đây)
      const now = new Date()
      const startMonth = new Date(now.getFullYear(), now.getMonth() - 5, 1)
      let time = []
      for (let i = 0; i < 6; i++) {
        let d = new Date(now.getFullYear(), now.getMonth() - i, 1)
        let formattedTime = `${('0' + (d.getMonth() + 1)).slice(
          -2
        )}-${d.getFullYear()}`
        time.push({
          time: formattedTime,
          month: d.getMonth() + 1,
          year: d.getFullYear()
        })
      }
      time = time.reverse()
      let monthlyData = time.map(({ time, month, year }) => ({
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
            time: { $dateToString: { format: '%m-%Y', date: '$createdAt' } },
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
        const monthObj = monthlyData.find((r) => r.time === monthKey)
        if (monthObj) {
          monthObj[item._id.status] = item.count
        }
      })

      monthlyData.forEach((item) => {
        item.total =
          item.posted + item.confirmed + item.expired + item.cancelled
        if (item.total > 0) {
          item.rate = {
            posted: ((item.posted / item.total) * 100).toFixed(2) + '%',
            confirmed: ((item.confirmed / item.total) * 100).toFixed(2) + '%',
            expired: ((item.expired / item.total) * 100).toFixed(2) + '%',
            cancelled: ((item.cancelled / item.total) * 100).toFixed(2) + '%'
          }
        } else {
          item.rate = {
            posted: '0%',
            confirmed: '0%',
            expired: '0%',
            cancelled: '0%'
          }
        }
      })

      res.json({
        totalPosts: { ...counts, rate: overallRate },
        monthlyData
      })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  },

  getApplication: async (req, res) => {
    try {
      // 1. Tổng số application (applied, approved) và tính rate tổng
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
      const overallRate =
        total > 0
          ? {
              applied: ((totals.totalApplied / total) * 100).toFixed(2) + '%',
              approved: ((totals.totalApproved / total) * 100).toFixed(2) + '%'
            }
          : { applied: '0%', approved: '0%' }

      // 2. Thống kê application theo tháng (6 tháng gần đây)
      const now = new Date()
      const startMonth = new Date(now.getFullYear(), now.getMonth() - 5, 1)
      let time = []
      for (let i = 0; i < 6; i++) {
        let d = new Date(now.getFullYear(), now.getMonth() - i, 1)
        let formattedTime = `${('0' + (d.getMonth() + 1)).slice(
          -2
        )}-${d.getFullYear()}`
        time.push({
          time: formattedTime,
          month: d.getMonth() + 1,
          year: d.getFullYear()
        })
      }
      time = time.reverse()
      let monthlyData = time.map(({ time, month, year }) => ({
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
            time: { $dateToString: { format: '%m-%Y', date: '$createdAt' } },
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
        const monthObj = monthlyData.find((r) => r.time === item._id)
        if (monthObj) {
          monthObj.applied = item.totalApplied
          monthObj.approved = item.totalApproved
          monthObj.total = item.totalApplied + item.totalApproved
        }
      })

      monthlyData.forEach((item) => {
        if (item.total > 0) {
          item.rate = {
            applied: ((item.applied / item.total) * 100).toFixed(2) + '%',
            approved: ((item.approved / item.total) * 100).toFixed(2) + '%'
          }
        } else {
          item.rate = { applied: '0%', approved: '0%' }
        }
      })

      res.json({
        totalApplications: {
          applied: totals.totalApplied,
          approved: totals.totalApproved,
          total,
          rate: overallRate
        },
        monthlyData
      })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
}

module.exports = chartControllers
