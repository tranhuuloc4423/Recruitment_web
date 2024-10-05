const {
  createNotification,
  getAllNotifications,
  getNotificationsBySender,
  getNotificationsByRecipient
} = require('../controllers/notificationControllers')

const router = require('express').Router()

router.post('/create', createNotification)
router.get('/', getAllNotifications)
router.get('/sender/:senderId', getNotificationsBySender)
router.get('/recipient/:recipientId', getNotificationsByRecipient)

module.exports = router
