const Notification = require('../models/notificationModel')
const Admin = require('../models/adminModel')
const Recruiter = require('../models/recruiterModel')
const Candidate = require('../models/candidateModel')

const notiControllers = {
  createNotification: async (req, res) => {
    try {
      const { sender, recipient, title, desc } = req.body

      const newNotification = new Notification({
        sender,
        recipient,
        title,
        desc
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
        return res.status(404).json({ message: 'Người nhận không tìm thấy' })
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
      const { id } = req.params

      const notifications = await Notification.find({ sender: id })

      const enrichedNotifications = await Promise.all(
        notifications.map(async (notification) => {
          if (!notification.sender) {
            return {
              ...notification.toObject(),
              senderName: null,
              senderRole: null
            }
          }

          const senderInfo =
            (await Admin.findOne(
              { UserId: notification.sender },
              'basic_info.name'
            )) ||
            (await Candidate.findOne(
              { UserId: notification.sender },
              'basic_info.name'
            )) ||
            (await Recruiter.findOne(
              { UserId: notification.sender },
              'basic_info.name'
            ))

          return {
            ...notification.toObject(),
            senderName: senderInfo ? senderInfo.basic_info.name : null
          }
        })
      )

      res.status(200).json(enrichedNotifications)
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Lỗi khi lấy thông báo theo người gửi', error })
    }
  },

  getNotificationsByRecipient: async (req, res) => {
    try {
      const { id } = req.params

      const notifications = await Notification.find({ recipient: id })

      const enrichedNotifications = await Promise.all(
        notifications.map(async (notification) => {
          if (!notification.sender) {
            return {
              ...notification.toObject(),
              senderName: null,
              senderRole: null
            }
          }

          const senderInfo =
            (await Admin.findOne(
              { UserId: notification.sender },
              'basic_info.name'
            )) ||
            (await Candidate.findOne(
              { UserId: notification.sender },
              'basic_info.name'
            )) ||
            (await Recruiter.findOne(
              { UserId: notification.sender },
              'basic_info.name'
            ))

          return {
            ...notification.toObject(),
            senderName: senderInfo ? senderInfo.basic_info.name : null
          }
        })
      )

      res.status(200).json(enrichedNotifications)
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Lỗi khi lấy thông báo theo người nhận', error })
    }
  },
  deleteNotification: async (req, res) => {
    try {
      const { id } = req.params

      const notification = await Notification.findByIdAndDelete(id)
      if (!notification) {
        return res.status(404).json({ message: 'Thông báo không tồn tại' })
      }

      await Admin.updateMany(
        { notifications: id },
        { $pull: { notifications: id } }
      )
      await Recruiter.updateMany(
        { notifications: id },
        { $pull: { notifications: id } }
      )
      await Candidate.updateMany(
        { notifications: id },
        { $pull: { notifications: id } }
      )

      res.status(200).json({ message: 'Xóa thông báo thành công' })
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi xóa thông báo', error })
    }
  }
}

module.exports = notiControllers
