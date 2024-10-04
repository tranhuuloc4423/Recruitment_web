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
  followUser
} = require('../controllers/candidateControllers')

const router = require('express').Router()

router.put('/:candidateId/basic_info', updateBasicInfo)
router.put('/:candidateId/other_info', updateOtherInfo)
router.put('/:candidateId/target', updateTarget)
router.get('/:candidateId/', getDataById)
router.get('/', getAllData)
router.get('/:candidateId/saved_jobs', getSavedJobs)
router.get('/:candidateId/recent_jobs', getRecentJobs)
router.get('/:candidateId/applied_jobs', getAppliedJobs)
router.get('/:candidateId/followed_jobs', getFollowedJobs)
router.post('/:candidateId/followed_jobs', followUser)

module.exports = router
