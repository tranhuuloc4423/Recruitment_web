const {
  updateBasicInfo,
  updateOtherInfo,
  getDataById,
  getAllData,
  updateTarget,
  getSavedJobs,
  getRecentJobs,
  getAppliedJobs,
  getFollowedJobs,
  followUser,
  updateRecent,
  getDataByIdRole
} = require('../controllers/candidateControllers')

const router = require('express').Router()

router.put('/basic_info/:id', updateBasicInfo)
router.put('/other_info/:id', updateOtherInfo)
router.put('/target/:id', updateTarget)
router.post('/followed_jobs/:id', followUser)
router.put('/recent_jobs/:id', updateRecent)
router.get('/:id', getDataById)
router.get('/role/:id', getDataByIdRole)
router.get('/', getAllData)
router.get('/saved_jobs/:id', getSavedJobs)
router.get('/applied_jobs/:id', getAppliedJobs)
router.get('/followed_jobs/:id', getFollowedJobs)
router.get('/recent_jobs/:id', getRecentJobs)

module.exports = router
