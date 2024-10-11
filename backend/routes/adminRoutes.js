const {
  updateBasicInfo,
  updateOtherInfo,
  getDataById,
  getAllData,
  getPosts,
  getConfirmedPosts,
  getPostedPosts
} = require('../controllers/adminControllers')

const router = require('express').Router()

router.put('/:adminId/basic_info', updateBasicInfo)
router.put('/:adminId/other_info', updateOtherInfo)
router.get('/:adminId/', getDataById)
router.get('/', getAllData)
router.get('/:id/posts', getPosts)
router.get('/:id/manage_post/confirmed', getConfirmedPosts)
router.get('/:id/manage_post/posted', getPostedPosts)

module.exports = router
