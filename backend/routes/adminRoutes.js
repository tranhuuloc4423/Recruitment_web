const {
  updateBasicInfo,
  updateOtherInfo,
  getDataById,
  getAllData,
  getPosts,
  getConfirmedPosts,
  getPostedPosts
} = require('../controllers/adminControllers')
const upload = require('../index')

const router = require('express').Router()

router.put(
  '/:adminId/basic_info',
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
router.put(
  '/:adminId/other_info',
  (req, res, next) => {
    upload.array('images', 10)(req, res, function (err) {
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
  updateOtherInfo
)
router.get('/:adminId/', getDataById)
router.get('/', getAllData)
router.get('/:id/posts', getPosts)
router.get('/:id/manage_post/confirmed', getConfirmedPosts)
router.get('/:id/manage_post/posted', getPostedPosts)

module.exports = router
