const {
  updateBasicInfo,
  updateOtherInfo,
  getDataById,
  getAllData,
  getPosts,
  getConfirmedPosts,
  getPostedPosts,
  getExpiredPosts,
  getDataByIdRole,
  getNotification
} = require('../controllers/adminControllers')

const router = require('express').Router()

router.put('/basic_info/:id', updateBasicInfo)
router.put('/other_info/:id', updateOtherInfo)
router.get('/:id', getDataById)
router.get('/role/:id', getDataByIdRole)
router.get('/', getAllData)
router.get('/posts/:id', getPosts)
router.get('/confirmed/:id', getConfirmedPosts)
router.get('/posted/:id', getPostedPosts)
router.get('/expired/:id', getExpiredPosts)
router.get('/notification/:id', getNotification)

module.exports = router
