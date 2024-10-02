const {
  updateBasicInfo,
  updateOtherInfo,
  getDataById,
  getAllData,
  updateSavedJobs,
  updateAppliedJobs,
  updateFollowedCompanies,
  updateNotifications,
  updateTarget
} = require('../controllers/candidateControllers')

const router = require('express').Router()

router.put('/:candidateId/basic_info', updateBasicInfo)
router.put('/:candidateId/other_info', updateOtherInfo)
router.put('/:candidateId/saved_jobs', updateSavedJobs)
router.put('/:candidateId/applied_jobs', updateAppliedJobs)
router.put('/:candidateId/followed_companies', updateFollowedCompanies)
router.put('/:candidateId/notifications', updateNotifications)
router.put('/:candidateId/target', updateTarget)
router.get('/:candidateId/', getDataById)
router.get('/', getAllData)

module.exports = router
