const candidateControllers = require('../controllers/candidateControllers')

const router = require('express').Router()

router.put('/:id/basic_info', candidateControllers.updateBasicInfo)
router.put('/:id/other_info', candidateControllers.updateOtherInfo)
router.put('/:id/saved_jobs', candidateControllers.updateSavedJobs)
router.put('/:id/applied_jobs', candidateControllers.updateAppliedJobs)
router.put(
  '/:id/followed_companies',
  candidateControllers.updateFollowedCompanies
)
router.put('/:id/notifications', candidateControllers.updateNotifications)
router.put('/:id/target', candidateControllers.updateTarget)
router.get('/:id/', candidateControllers.getDataById)
router.get('/', candidateControllers.getAllData)

module.exports = router
