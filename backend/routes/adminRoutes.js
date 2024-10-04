const {
  updateBasicInfo,
  updateOtherInfo,
  getDataById,
  getAllData
} = require('../controllers/adminControllers')

const router = require('express').Router()

router.put('/:adminId/basic_info', updateBasicInfo)
router.put('/:adminId/other_info', updateOtherInfo)
router.get('/:adminId/', getDataById)
router.get('/', getAllData)

module.exports = router
