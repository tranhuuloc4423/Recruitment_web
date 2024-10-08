const {
  getAllData,
  getDataById,
  updateBasicInfo,
  updateOtherInfo,
  getPosts,
  getConfirmedPosts,
  getPostedPosts
} = require('../controllers/recruiterControllers')

const router = require('express').Router()

router.put('/:recruiterId/basic_info', updateBasicInfo)
router.put('/:recruiterId/other_info', updateOtherInfo)
router.get('/:recruiterId/', getDataById)
router.get('/', getAllData)
router.get('/:userId', getPosts)
router.get('/:userId/confirmed', getConfirmedPosts)
router.get('/:userId/posted', getPostedPosts)

module.exports = router
