const {
  createNotification,
  getAllNotifications,
  getNotificationsBySender,
  getNotificationsByRecipient,
  deleteNotification
} = require('../controllers/notificationControllers')

const router = require('express').Router()

router.post('/create', createNotification)
router.get('/', getAllNotifications)
router.get('/:id/sender', getNotificationsBySender)
router.get('/:id/recipient', getNotificationsByRecipient)
router.delete('/:id', deleteNotification)
module.exports = router
