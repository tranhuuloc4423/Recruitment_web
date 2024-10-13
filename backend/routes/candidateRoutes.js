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
  updateRecent
} = require('../controllers/candidateControllers')
const upload = require('../index')

const router = require('express').Router()

router.put(
  '/:candidateId/basic_info',
  (req, res, next) => {
    upload.single('image')(req, res, function (err) {
      if (err) {
        res.json({ msg: err.message })
      } else {
        const file = req.file
        console.log(file)

        try {
        } catch (e) {
          console.error(e)
        }
        res.json({ msg: 'ok' })
      }
    })
  },
  updateBasicInfo
)
router.put('/:candidateId/other_info', updateOtherInfo)
router.put('/:candidateId/target', updateTarget)
router.get('/:candidateId/', getDataById)
router.get('/', getAllData)
router.get('/:candidateId/saved_jobs', getSavedJobs)
router.get('/:candidateId/applied_jobs', getAppliedJobs)
router.get('/:candidateId/followed_jobs', getFollowedJobs)
router.post('/:candidateId/followed_jobs', followUser)
router.get('/:candidateId/recent_jobs', getRecentJobs)
router.put('/:candidateId/recent_jobs', updateRecent)

module.exports = router
