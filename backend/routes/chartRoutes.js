const express = require('express')
const router = express.Router()
const {
  getTotalUser,
  getUserByMonth,
  getTotalPost,
  getPostByMonth,
  getTotalApplication,
  getApplicationByMonth,
  getRateUser,
  getRatePost,
  getRateApply
} = require('../controllers/chartControllers')

router.get('/user/total', getTotalUser)
router.get('/user/by-month', getUserByMonth)
router.get('/user/rate', getRateUser)

router.get('/post/total', getTotalPost)
router.get('/post/by-month', getPostByMonth)
router.get('/post/rate', getRatePost)

router.get('/application/total', getTotalApplication)
router.get('/application/by-month', getApplicationByMonth)
router.get('/application/rate', getRateApply)

module.exports = router
