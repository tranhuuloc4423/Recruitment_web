const {
  createNotification,
  getAllNotifications,
  getNotificationsBySender,
  getNotificationsByRecipient
} = require('../controllers/notificationControllers')

const router = require('express').Router()

router.post('/create', createNotification)
router.get('/', getAllNotifications)
router.get('/:senderId/sender', getNotificationsBySender)
router.get('/:recipientId/recipient', getNotificationsByRecipient)

module.exports = router
