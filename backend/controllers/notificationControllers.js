const Notification = require('../models/notificationModel')
const Admin = require('../models/adminModel')
const Recruiter = require('../models/recruiterModel')
const Candidate = require('../models/candidateModel')

const notiControllers = {
  createNotification: async (req, res) => {
    try {
      const { sender, recipient, title, desc, time } = req.body

      let expiresAt = new Date()
      switch (time) {
        case '1 day':
          expiresAt.setDate(expiresAt.getDate() + 1)
          break
        case '2 days':
          expiresAt.setDate(expiresAt.getDate() + 2)
          break
        case '3 days':
          expiresAt.setDate(expiresAt.getDate() + 3)
          break
        case '4 days':
          expiresAt.setDate(expiresAt.getDate() + 4)
          break
        case '5 days':
          expiresAt.setDate(expiresAt.getDate() + 5)
          break
        case '6 days':
          expiresAt.setDate(expiresAt.getDate() + 6)
          break
        case '7 days':
          expiresAt.setDate(expiresAt.getDate() + 7)
          break
        default:
          expiresAt.setDate(expiresAt.getDate() + 7)
      }

      const newNotification = new Notification({
        sender,
        recipient,
        title,
        desc,
        time,
        expiresAt
      })

      await newNotification.save()

      let updatedUser

      updatedUser = await Admin.findOneAndUpdate(
        { userId: recipient },
        { $push: { notifications: newNotification._id } },
        { new: true, useFindAndModify: false }
      )

      if (!updatedUser) {
        updatedUser = await Recruiter.findOneAndUpdate(
          { userId: recipient },
          { $push: { notifications: newNotification._id } },
          { new: true, useFindAndModify: false }
        )
      }

      if (!updatedUser) {
        updatedUser = await Candidate.findOneAndUpdate(
          { userId: recipient },
          { $push: { notifications: newNotification._id } },
          { new: true, useFindAndModify: false }
        )
      }

      if (!updatedUser) {
        return res.status(404).json({ message: 'Recipient not found' })
      }
      res
        .status(201)
        .json({ notification: newNotification, recipient: updatedUser })
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  },
  getAllNotifications: async (req, res) => {
    try {
      const notifications = await Notification.find()
      res.status(200).json(notifications)
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Lỗi khi lấy danh sách thông báo', error })
    }
  },
  getNotificationsBySender: async (req, res) => {
    try {
      const { senderId } = req.params
      const notifications = await Notification.find({ sender: senderId })
      res.status(200).json(notifications)
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Lỗi khi lấy thông báo theo người gửi', error })
    }
  },
  getNotificationsByRecipient: async (req, res) => {
    try {
      const { recipientId } = req.params
      const notifications = await Notification.find({ recipient: recipientId })
      res.status(200).json(notifications)
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Lỗi khi lấy thông báo theo người nhận', error })
    }
  }
}

module.exports = notiControllers
