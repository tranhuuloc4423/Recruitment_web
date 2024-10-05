const Notification = require('../models/notificationModel')

const notiControllers = {
  createNotification: async (req, res) => {
    try {
      const { sender, recipient, time, title, desc } = req.body

      const newNotification = new Notification({
        sender,
        recipient,
        time,
        title,
        desc
      })

      await newNotification.save()
      res.status(201).json(newNotification)
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi tạo thông báo', error })
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
      const senderId = req.params.senderId
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
      const recipientId = req.params.recipientId
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
