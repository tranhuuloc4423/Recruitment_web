const {
  getAllData,
  getDataById,
  updateBasicInfo,
  updateOtherInfo,
  getPosts,
  getConfirmedPosts,
  getPostedPosts
} = require('../controllers/recruiterControllers')
const upload = require('../index')

const router = require('express').Router()

router.put(
  '/:recruiterId/basic_info',
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
router.put('/:recruiterId/other_info', updateOtherInfo)
router.get('/:recruiterId/', getDataById)
router.get('/', getAllData)
router.get('/:userId', getPosts)
router.get('/:userId/confirmed', getConfirmedPosts)
router.get('/:userId/posted', getPostedPosts)

module.exports = router
