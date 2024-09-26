const candidateControllers = require('../controllers/candidateControllers')

const router = require('express').Router()

router.put('/:candidateId/basic_info', candidateControllers.updateBasicInfo)
router.put('/:candidateId/other_info', candidateControllers.updateOtherInfo)
router.put('/:candidateId/saved_jobs', candidateControllers.updateSavedJobs)
router.put('/:candidateId/applied_jobs', candidateControllers.updateAppliedJobs)
router.put(
  '/:candidateId/followed_companies',
  candidateControllers.updateFollowedCompanies
)
router.put(
  '/:candidateId/notifications',
  candidateControllers.updateNotifications
)
router.put('/:candidateId/target', candidateControllers.updateTarget)
router.get('/:candidateId/', candidateControllers.getDataById)
router.get('/', candidateControllers.getAllData)

module.exports = router
