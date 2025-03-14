const express = require('express')
const router = express.Router()
const {
  getUser,
  getPost,
  getApplication
} = require('../controllers/chartControllers')

router.get('/user', getUser)
router.get('/post', getPost)
router.get('/application', getApplication)

module.exports = router
