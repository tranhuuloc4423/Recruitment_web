const {
  getAllData,
  getDataById,
  updateBasicInfo,
  updateOtherInfo
} = require('../controllers/recruiterControllers')

const router = require('express').Router()

router.put('/:recruiterId/basic_info', updateBasicInfo)
router.put('/:recruiterId/other_info', updateOtherInfo)
router.get('/:recruiterId/', getDataById)
router.get('/', getAllData)

module.exports = router
