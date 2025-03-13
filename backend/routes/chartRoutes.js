const express = require('express')
const router = express.Router()
const {
  getUserCount,
  getPostCount,
  getTotalApplicationCount,
  getUserCountCurrentMonth,
  getPostCountCurrentMonthConfirmed,
  getPostCountCurrentMonthCancelled,
  getTotalApplicationCountCurrentMonth,
  getApplicationSuccessRateCurrentMonth
} = require('../controllers/chartControllers')

router.get('/user', getUserCount)
router.get('/post', getPostCount)
router.get('/application', getTotalApplicationCount)
router.get('/user-current-month', getUserCountCurrentMonth)
router.get('/post-current-month-confirmed', getPostCountCurrentMonthConfirmed)
router.get('/post-current-month-cancelled', getPostCountCurrentMonthCancelled)
router.get('/application-current-month', getTotalApplicationCountCurrentMonth)
router.get(
  '/application-success-rate-current-month',
  getApplicationSuccessRateCurrentMonth
)

module.exports = router
